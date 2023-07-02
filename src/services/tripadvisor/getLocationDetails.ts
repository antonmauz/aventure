import axios from "axios";

interface Options {
  language: "en" | "de";
}

``;

export const getLocationDetails = (id: string, options: Options) => {
  const config = {
    method: "GET",
    url: `${process.env.TRIPADVISOR_BASE_URL}/location/${id}/details?key=${process.env.TRIPADVISOR_API_KEY}&language=${options.language}&currency=EUR`,
    headers: { accept: "application/json" },
  };

  const data = axios
    .request(config)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error(error);
    });

  return data;
};
