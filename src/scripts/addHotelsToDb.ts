import { DatabaseHotel, databaseService, MongooseHotel, tripadvisorService } from "@services";
import { Document } from "mongoose";
import latlong from "./latlong.json";
import { ACCESSIBILITY_AMENITIES, HOTEL_AMENITIES } from "@constants";
import { getRandomSubarray } from "./getRandomSubarray";

databaseService.connectDB();

type Location = {
  city: string;
  lat: string;
  long: string;
};

type RawDatabaseHotel = Omit<DatabaseHotel, keyof Document>;

const getLocations = async ({ lat, long }: Location): Promise<RawDatabaseHotel[]> => {
  const { data: locations } = await tripadvisorService.findLocationsByLocation({
    lat,
    long,
    language: "de",
    category: "hotels",
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
      highlights: location.description,
      address: {
        street,
        houseNumber,
        city: location.address_obj.city,
        country: location.address_obj.country,
        zipCode: location.address_obj.postalcode ?? "N/A",
      },
      amenities: location.amenities ?? getRandomSubarray(HOTEL_AMENITIES, Math.round(Math.random() * 5)),
      accessibilityAmenities: getRandomSubarray(ACCESSIBILITY_AMENITIES, Math.round(Math.random() * 8)),
      images: (await tripadvisorService.getLocationPhotos(location.location_id, { language: "de" })).data
        .map((entry) => entry.images.original?.url)
        .filter((url) => url !== undefined),
      reviews: [],
      rating: undefined,
      phoneNumber: location.phone,
      affiliateLink: location.web_url,
      stars: Math.round(location.rating ?? 3),
      isVerified: Math.random() > 0.4,
    });

    await new Promise((r) => setTimeout(r, 2000));
    console.log("mapped", location.name);
  }

  // @ts-ignore
  return mappedLocations;
};

const addHotelsToDb = async () => {
  const locations: Location[] = latlong;

  for (let i = 0; i < locations.length; i++) {
    const locationsDetails = await getLocations(locations[i]);

    await Promise.all(
      locationsDetails.map(async (location) => {
        await MongooseHotel.updateOne({ tripadvisorId: location.tripadvisorId }, location, {
          upsert: true,
        });
      })
    );

    await new Promise((r) => setTimeout(r, 5000));
    console.log("done with", locations[i].city);
  }
};

addHotelsToDb();
