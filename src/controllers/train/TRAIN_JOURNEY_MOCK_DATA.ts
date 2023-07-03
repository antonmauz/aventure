export const TRAIN_JOURNEY_MOCK_DATA = [
  {
    startTrainStation: "Munich",
    endTrainStation: "Hamburg",
    departure: new Date("2021-07-21T08:00:00.000Z"),
    arrival: new Date("2021-07-21T10:00:00.000Z"),
    connections: [
      {
        trainId: "ICE 123",
        departure: {
          trainStation: "Munich",
          time: new Date("2021-07-21T08:00:00.000Z"),
          track: "5",
        },
        arrival: {
          trainStation: "Hamburg",
          time: new Date("2021-07-21T10:00:00.000Z"),
          track: "7",
        },
      },
    ],
    affiliateLink: "https://www.example.com",
  },
  {
    startTrainStation: "Munich",
    endTrainStation: "Schleswig",
    departure: new Date("2021-07-21T08:00:00.000Z"),
    arrival: new Date("2021-07-21T12:00:00.000Z"),
    connections: [
      {
        trainId: "ICE 123",
        departure: {
          trainStation: "Munich",
          time: new Date("2021-07-21T08:00:00.000Z"),
          track: "5",
        },
        arrival: {
          trainStation: "Hamburg",
          time: new Date("2021-07-21T10:00:00.000Z"),
          track: "7",
        },
      },
      {
        trainId: "RE 7",
        departure: {
          trainStation: "Hamburg",
          time: new Date("2021-07-21T10:30:00.000Z"),
          track: "2",
        },
        arrival: {
          trainStation: "Schleswig",
          time: new Date("2021-07-21T12:00:00.000Z"),
          track: "1",
        },
      },
    ],
    affiliateLink: "https://www.example.com",
  },
  {
    startTrainStation: "Berlin",
    endTrainStation: "Munich",
    departure: new Date("2021-07-22T09:30:00.000Z"),
    arrival: new Date("2021-07-22T16:45:00.000Z"),
    connections: [
      {
        trainId: "ICE 456",
        departure: {
          trainStation: "Berlin",
          time: new Date("2021-07-22T09:30:00.000Z"),
          track: "5",
        },
        arrival: {
          trainStation: "Hamburg",
          time: new Date("2021-07-22T13:45:00.000Z"),
          track: "7",
        },
      },
      {
        trainId: "ICE 789",
        departure: {
          trainStation: "Hamburg",
          time: new Date("2021-07-22T14:15:00.000Z"),
          track: "2",
        },
        arrival: {
          trainStation: "Munich",
          time: new Date("2021-07-22T16:45:00.000Z"),
          track: "1",
        },
      },
    ],
    affiliateLink: "https://www.example.com",
  },
  {
    startTrainStation: "Frankfurt",
    endTrainStation: "Cologne",
    departure: new Date("2021-07-23T12:00:00.000Z"),
    arrival: new Date("2021-07-23T14:30:00.000Z"),
    connections: [
      {
        trainId: "ICE 987",
        departure: {
          trainStation: "Frankfurt",
          time: new Date("2021-07-23T12:00:00.000Z"),
          track: "5",
        },
        arrival: {
          trainStation: "Cologne",
          time: new Date("2021-07-23T14:30:00.000Z"),
          track: "7",
        },
      },
    ],
    affiliateLink: "https://www.example.com",
  },
  {
    startTrainStation: "Hamburg",
    endTrainStation: "Dresden",
    departure: new Date("2021-07-24T08:15:00.000Z"),
    arrival: new Date("2021-07-24T15:30:00.000Z"),
    connections: [
      {
        trainId: "ICE 654",
        departure: {
          trainStation: "Hamburg",
          time: new Date("2021-07-24T08:15:00.000Z"),
          track: "5",
        },
        arrival: {
          trainStation: "Berlin",
          time: new Date("2021-07-24T11:45:00.000Z"),
          track: "7",
        },
      },
      {
        trainId: "ICE 321",
        departure: {
          trainStation: "Berlin",
          time: new Date("2021-07-24T12:00:00.000Z"),
          track: "5",
        },
        arrival: {
          trainStation: "Dresden",
          time: new Date("2021-07-24T15:30:00.000Z"),
          track: "7",
        },
      },
    ],
    affiliateLink: "https://www.example.com",
  },
];
