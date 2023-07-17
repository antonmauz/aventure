import axios from "axios";
import { schemaForType } from "../schema";
import { z } from "zod";

interface TripadvisorLocation {
  location_id: string;
  name: string;
  description?: string;
  web_url: string;
  address_obj: {
    street1: string;
    city: string;
    country: string;
    postalcode?: string;
  };
  cuisine?: { name: string }[];
  price_level?: string;
  amenities?: string[]; //only Hotel?
  features?: string[]; //only restaurant?
  phone?: string;
}

const tripadvisorLocationSchema = z.object({
  location_id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  web_url: z.string(),
  address_obj: z.object({
    street1: z.string(),
    city: z.string(),
    country: z.string(),
    postalcode: z.string().optional(),
  }),
  cuisine: z
    .array(
      z.object({
        name: z.string(),
      })
    )
    .optional(),
  price_level: z.string().optional(),
  amenities: z.array(z.string()).optional(),
  features: z.array(z.string()).optional(),
  phone: z.string().optional(),
  rating: z
    .string()
    .optional()
    .transform((number) => (number ? parseFloat(number) : 3)),
});

const tripadvisorLocationParser = schemaForType<TripadvisorLocation>()(tripadvisorLocationSchema);

interface Options {
  language: "en" | "de";
}

export const getLocationDetails = async (id: string, options: Options) => {
  const { data } = await axios.get(
    `${
      process.env.TRIPADVISOR_BASE_URL ?? "https://api.content.tripadvisor.com/api/v1"
    }/location/${id}/details`,
    {
      params: {
        //TODO remove fallback
        key: process.env.TRIPADVISOR_API_KEY ?? "",
        language: options.language,
        //TODO currency: "EUR",
      },
      headers: { accept: "application/json" },
    }
  );

  return tripadvisorLocationParser.parse(data);
};
