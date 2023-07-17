import axios from "axios";

interface Options {
  language: "en" | "de";
  category: "restaurants" | "hotels";
}

export const findLocationsBySearchQuery = async (searchQuery: string, { category, language }: Options) => {
  const { data } = await axios.get(
    `${process.env.TRIPADVISOR_BASE_URL ?? "https://api.content.tripadvisor.com/api/v1"}/location/search`,
    {
      params: {
        key: process.env.TRIPADVISOR_API_KEY,
        searchQuery,
        category,
        language,
      },
      headers: {
        accept: "application/json",
      },
    }
  );

  return data;
};
