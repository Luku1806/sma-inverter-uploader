export interface InverterDto {
  readonly serialNumber: number;
  readonly status: string;
  readonly temperature: number;
}

export class MeasurementDto {
  readonly inverter: InverterDto;
  readonly gridFrequency: number;
  readonly gridRelay: string;
  readonly hoursOfFeed: number;
  readonly hoursOfOperation: number;
  readonly production: {
    readonly total: number;
    readonly today: number;
    readonly current: {
      dc: {
        voltage: { '1': number; '2': number };
        current: { '1': number; '2': number };
        power: { '1': number; '2': number };
      };
      ac: {
        voltage: { '1': number; '2': number; '3': number };
        current: { '1': number; '2': number; '3': number };
        power: { '1': number; '2': number; '3': number };
      };
    };
  };
  readonly sunRise: Date;
  readonly sunSet: Date;
  readonly time: Date;
}
