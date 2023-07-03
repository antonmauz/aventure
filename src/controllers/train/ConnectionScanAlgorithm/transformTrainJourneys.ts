import { TRAIN_JOURNEYS_MOCK } from "../../../services/deutscheBahn/TRAIN_JOURNEYS_MOCK";
import { CSAConnection } from "./ConnectionScanAlgorithm";

const hmsToSecondsOnly = (hm: string) => {
  const a = hm.split(":");

  return +a[0] * 60 * 60 + +a[1] * 60;
};
export const transformTrainJourneys = (): CSAConnection[] => {
  const journeys = TRAIN_JOURNEYS_MOCK.map((trainJourney) => {
    const { route } = trainJourney;

    return route
      .map((currentStop, index) => {
        if (index === route.length - 1) {
          return null;
        }

        const nextStop = route[index + 1];

        return {
          trainId: trainJourney.train_number,
          departureStation: parseInt(currentStop.stationId),
          departureTrackId: currentStop.track,
          arrivalStation: parseInt(nextStop.stationId),
          arrivalTrackId: nextStop.track,
          departureTimestamp: hmsToSecondsOnly(currentStop.departureTime),
          arrivalTimestamp: hmsToSecondsOnly(nextStop.arrivalTime),
        };
      })
      .filter((connection) => connection !== null) as CSAConnection[];
  });

  return journeys.reduce((acc, line) => [...acc, ...line], []);
};
