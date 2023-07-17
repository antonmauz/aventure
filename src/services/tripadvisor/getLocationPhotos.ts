import axios from "axios";
import { z } from "zod";
import { schemaForType } from "../schema";

interface Image {
  height: number;
  width: number;
  url: string;
}

const imageSchema = z.object({
  height: z.number(),
  width: z.number(),
  url: z.string(),
});

interface TripadvisorLocationPhoto {
  id: number;
  images: {
    original?: Image;
  };
}

interface TripadvisorLocationPhotos {
  data: TripadvisorLocationPhoto[];
}

const locationPhotosSchema = z.object({
  data: z.array(
    z.object({
      id: z.number(),
      images: z.object({
        original: imageSchema.optional(),
      }),
    })
  ),
});

const locationPhotosParser = schemaForType<TripadvisorLocationPhotos>()(locationPhotosSchema);

interface Options {
  language: "en" | "de";
}

export const getLocationPhotos = async (id: string, options: Options) => {
  const { data } = await axios.get(
    `${
      process.env.TRIPADVISOR_BASE_URL ?? "https://api.content.tripadvisor.com/api/v1"
    }/location/${id}/photos`,
    {
      params: {
        //TODO remove fallback
        key: process.env.TRIPADVISOR_API_KEY ?? "",
        language: options.language,
      },
      headers: { accept: "application/json" },
    }
  );

  return locationPhotosParser.parse(data);
};
