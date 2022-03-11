import { toMeasurement } from "./measurement";

const rawMeasurement = {
  Timestamp: "05/03/2022 18:37:49",
  InvTime: "05/03/2022 18:37:35",
  SunRise: "05/03/2022 06:44:00",
  SunSet: "05/03/2022 17:51:00",
  InvSerial: 2100125040,
  InvName: "SN: 2100125040",
  InvStatus: "Ok",
  InvTemperature: 40.0,
  InvGridRelay: "Closed",
  ETotal: 40817.612,
  EToday: 16.575,
  PACTot: 0.1,
  PDC1: 0.2,
  PDC2: 0.3,
  UDC1: 0.4,
  UDC2: 0.5,
  IDC1: 0.6,
  IDC2: 0.7,
  PAC1: 0.8,
  PAC2: 0.9,
  PAC3: 0.01,
  UAC1: 0.02,
  UAC2: 0.03,
  UAC3: 0.04,
  IAC1: 0.05,
  IAC2: 0.06,
  IAC3: 0.07,
  GridFreq: 0.08,
  OperTm: 50801.499,
  FeedTm: 49266.401,
};

const measurement = {
  inverter: {
    name: "SN: 2100125040",
    serialNumber: 2100125040,
    status: "Ok",
    temperature: 40,
    time: new Date("2022-03-05T17:37:00.350Z"),
  },
  time: new Date("2022-03-05T17:37:00.490Z"),
  sunRise: new Date("2022-03-05T05:44:00.000Z"),
  sunSet: new Date("2022-03-05T16:51:00.000Z"),
  gridFrequency: 0.08,
  gridRelay: "Closed",
  hoursOfOperation: 50801.499,
  hoursOfFeed: 49266.401,
  production: {
    current: {
      ac: {
        current: { "1": 0.05, "2": 0.06, "3": 0.07 },
        voltage: { "1": 0.02, "2": 0.03, "3": 0.04 },
        power: { "1": 0.8, "2": 0.9, "3": 0.01 },
      },
      dc: {
        current: { "1": 0.6, "2": 0.7 },
        voltage: { "1": 0.4, "2": 0.5 },
        power: { "1": 0.2, "2": 0.3 },
      },
    },
    today: 16.575,
    total: 40817.612,
  },
};

describe("measurement", () => {
  describe("toMeasurement", () => {
    it("should map raw measurement to ", () => {
      expect(toMeasurement(rawMeasurement)).toStrictEqual(measurement);
    });
  });
});
