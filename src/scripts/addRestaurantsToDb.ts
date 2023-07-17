import { DatabaseRestaurant, databaseService, tripadvisorService } from "@services";
import { Document } from "mongoose";
import { MongooseRestaurant } from "../services/database/model/MongooseRestaurant";
import latlong from "./latlong.json";

databaseService.connectDB();

const CUISINES = [
  "bavarian",
  "german",
  "italian",
  "greek",
  "indian",
  "chinese",
  "thai",
  "french",
  "spanish",
  "turkish",
  "vietnamese",
  "japanese",
  "american",
  "mexican",
  "african",
  "other",
];

type Location = {
  city: string;
  lat: string;
  long: string;
};

type RawDatabaseRestaurant = Omit<DatabaseRestaurant, keyof Document>;

const getLocations = async ({ lat, long }: Location): Promise<RawDatabaseRestaurant[]> => {
  const { data: locations } = await tripadvisorService.findLocationsByLocation({
    lat,
    long,
    language: "de",
    category: "restaurants",
  });

  let locationsDetails = [];

  for (let i = 0; i < locations.length; i++) {
    const locationDetails = await tripadvisorService.getLocationDetails(locations[i].location_id, {
      language: "en",
    });

    locationsDetails.push(locationDetails);

    await new Promise((r) => setTimeout(r, 2000));
  }

  let mappedLocations = [];

  for (let i = 0; i < locationsDetails.length; i++) {
    const location = locationsDetails[i];

    const splittedStreet = location.address_obj.street1.split(" ");

    const street = splittedStreet.slice(0, splittedStreet.length - 1).join(" ");

    const houseNumber = splittedStreet[splittedStreet.length - 1];

    mappedLocations.push({
      tripadvisorId: location.location_id,
      name: location.name,
      highlights: location.description, //TODO
      address: {
        street,
        houseNumber,
        city: location.address_obj.city,
        country: location.address_obj.country,
        zipCode: location.address_obj.postalcode ?? "N/A",
      },
      cuisines:
        location.cuisine
          ?.filter((cuisine) => CUISINES.includes(cuisine.name))
          .map((cuisine) => cuisine.name) ?? ([] as DatabaseRestaurant["cuisines"]),
      //TODO priceLevel: locationDetails.price_level, // TODO: map price level
      accessibilityAmenities: [], //TODO, maybe fake it?
      images: (await tripadvisorService.getLocationPhotos(location.location_id, { language: "de" })).data
        .map((entry) => entry.images.original?.url)
        .filter((url) => url !== undefined),
      reviews: [],
      rating: undefined,
      phoneNumber: location.phone,
      affiliateLink: location.web_url,
      isVerified: false,
    });

    await new Promise((r) => setTimeout(r, 2000));
    console.log("mapped", location.name);
  }

  return mappedLocations;
};

const addRestaurantsToDb = async () => {
  const locations: Location[] = latlong;

  for (let i = 0; i < locations.length; i++) {
    const locationsDetails = await getLocations(locations[i]);

    await Promise.all(
      locationsDetails.map(async (location) => {
        await MongooseRestaurant.updateOne({ tripadvisorId: location.tripadvisorId }, location, {
          upsert: true,
        });
      })
    );

    await new Promise((r) => setTimeout(r, 10000));
    console.log("done with", locations[i].city);
  }
};

addRestaurantsToDb();
