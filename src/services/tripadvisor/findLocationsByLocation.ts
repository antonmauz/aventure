import axios from "axios";
import { z } from "zod";
import { schemaForType } from "../schema";

interface TripadvisorLocation {
  location_id: string;
}

type TripadvisorLocationResponse = {
  data: TripadvisorLocation[];
};

const locationSchema = z.object({
  data: z.array(
    z.object({
      location_id: z.string(),
    })
  ),
});

const locationParser = schemaForType<TripadvisorLocationResponse>()(locationSchema);

type Options = {
  lat: string;
  long: string;
  language: "en" | "de";
  category: "hotels" | "restaurants";
};

export const findLocationsByLocation = async ({
  lat,
  long,
  language,
  category,
}: Options): Promise<TripadvisorLocationResponse> => {
  const { data } = await axios.get(
    `${
      process.env.TRIPADVISOR_BASE_URL ?? "https://api.content.tripadvisor.com/api/v1"
    }/location/nearby_search`,
    {
      params: {
        //TODO remove fallback
        key: process.env.TRIPADVISOR_API_KEY ?? "",
        latLong: `${lat},${long}`,
        language,
        category,
      },
      headers: {
        accept: "application/json",
      },
    }
  );

  return locationParser.parse(data);
};
