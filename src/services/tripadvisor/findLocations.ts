import axios from "axios";

interface Options {
  language: "en" | "de";
}

export const findLocations = async (searchQuery: string, options: Options) => {
  const config = {
    method: "GET",
    url: `${process.env.TRIPADVISOR_BASE_URL}/location/search?key=${process.env.TRIPADVISOR_API_KEY}&searchQuery=${searchQuery}&category=restaurants&language=${options.language}`,
    headers: { accept: "application/json" },
  };

  const data = await axios
    .request(config)
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });

  return data;
};
