interface TrainStop {
  trainStation: string;
  time: Date;
  track: string;
}

interface TrainConnection {
  trainId: string;
  departure: TrainStop;
  arrival: TrainStop;
}

export interface DTOTrainJourney {
  departure: Date;
  arrival: Date;
  startTrainStation: string;
  endTrainStation: string;
  connections: TrainConnection[];
  affiliateLink: string;
}
