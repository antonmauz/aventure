import { mappedStations } from "./mappedStations";
import fs from "fs";

const mapJson = () => {
  JSON.stringify(mappedStations);

  // save to file
  fs.writeFile("stations.json", JSON.stringify(mappedStations), "utf8", () => console.log("done"));
};

mapJson();
