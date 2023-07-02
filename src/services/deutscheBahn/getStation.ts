import axios from "axios";

export const getStation = async (id: string) => {
  const data = await axios
    .get(`${process.env.DEUTSCHE_BAHN_BASE_URL}/station-data/v2/stations/${id}?locales=DE&locales=EN`, {
      headers: {
        accept: "application/vnd.de.db.ris+json",
        "DB-Client-Id": process.env.DEUTSCHE_BAHN_CLIENT_ID,
        "DB-Api-Key": process.env.DEUTSCHE_BAHN_API_KEY,
      },
    })
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });

  return data;
};
