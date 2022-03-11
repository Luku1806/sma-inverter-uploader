import { parse } from "date-fns";

export interface RawMeasurement {
  readonly Timestamp: string;
  readonly InvTime: string;
  readonly SunRise: string;
  readonly SunSet: string;
  readonly InvSerial: number;
  readonly InvName: string;
  readonly InvStatus: string;
  readonly InvTemperature: number;
  readonly InvGridRelay: string;
  readonly ETotal: number;
  readonly EToday: number;
  readonly PACTot: number;
  readonly PDC1: number;
  readonly PDC2: number;
  readonly UDC1: number;
  readonly UDC2: number;
  readonly IDC1: number;
  readonly IDC2: number;
  readonly PAC1: number;
  readonly PAC2: number;
  readonly PAC3: number;
  readonly UAC1: number;
  readonly UAC2: number;
  readonly UAC3: number;
  readonly IAC1: number;
  readonly IAC2: number;
  readonly IAC3: number;
  readonly GridFreq: number;
  readonly OperTm: number;
  readonly FeedTm: number;
}

export interface Inverter {
  readonly name: string;
  readonly serialNumber: number;
  readonly time: Date;
  readonly status: string;
  readonly temperature: number;
}

export interface PowerMeasurement {
  readonly inverter: Inverter;

  readonly time: Date;
  readonly sunRise: Date;
  readonly sunSet: Date;

  readonly hoursOfOperation: number;
  readonly hoursOfFeed: number;

  readonly gridRelay: string;
  readonly gridFrequency: number;

  readonly production: {
    readonly total: number;
    readonly today: number;
    readonly current: {
      dc: {
        voltage: {
          1: number;
          2: number;
        };
        current: {
          1: number;
          2: number;
        };
        power: {
          1: number;
          2: number;
        };
      };
      ac: {
        voltage: {
          1: number;
          2: number;
          3: number;
        };
        current: {
          1: number;
          2: number;
          3: number;
        };
        power: {
          1: number;
          2: number;
          3: number;
        };
      };
    };
  };
}

export function toMeasurement(raw: RawMeasurement): PowerMeasurement {
  return {
    inverter: {
      name: raw.InvName,
      serialNumber: raw.InvSerial,
      status: raw.InvStatus,
      temperature: raw.InvTemperature,
      time: parseDate(raw.InvTime),
    },
    time: parseDate(raw.Timestamp),
    sunRise: parseDate(raw.SunRise),
    sunSet: parseDate(raw.SunSet),
    gridFrequency: raw.GridFreq,
    gridRelay: raw.InvGridRelay,
    hoursOfOperation: raw.OperTm,
    hoursOfFeed: raw.FeedTm,
    production: {
      current: {
        ac: {
          current: { 1: raw.IAC1, 2: raw.IAC2, 3: raw.IAC3 },
          voltage: { 1: raw.UAC1, 2: raw.UAC2, 3: raw.UAC3 },
          power: { 1: raw.PAC1, 2: raw.PAC2, 3: raw.PAC3 },
        },
        dc: {
          current: { 1: raw.IDC1, 2: raw.IDC2 },
          voltage: { 1: raw.UDC1, 2: raw.UDC2 },
          power: { 1: raw.PDC1, 2: raw.PDC2 },
        },
      },
      today: raw.EToday,
      total: raw.ETotal,
    },
  };
}

const parseDate = (date: string) =>
  parse(date, "dd/MM/yyyy HH:mm:SS", new Date());
