import { Injectable } from '@nestjs/common';
import { MeasurementModel } from './measurement.schema';
import { MeasurementDto } from './measurement.dto';
import { v4 as uuidv4 } from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class MeasurementsService {
  constructor(
    @InjectModel(MeasurementModel.name)
    private readonly measurementModel: Model<MeasurementModel>,
  ) {}

  public async addMeasurement(measurement: MeasurementDto) {
    const result = await this.measurementModel.create(
      this.toMeasurementModel(measurement),
    );

    return this.toMeasurementDto(result);
  }

  public async getAll() {
    const measurementDocuments = await this.measurementModel
      .find({})
      .sort({ time: 'asc' })
      .exec();

    return measurementDocuments.map(this.toMeasurementDto);
  }

  public async countAll() {
    return await this.measurementModel.count().exec();
  }

  public async countAllForInverter(serialNumber: number) {
    return await this.measurementModel
      .count({ inverterSerial: serialNumber })
      .exec();
  }

  public async getAllForInverter(serialNumber: number) {
    const measurementDocuments = await this.measurementModel
      .find({ inverterSerial: serialNumber })
      .sort('time')
      .exec();

    return measurementDocuments.map(this.toMeasurementDto);
  }

  private toMeasurementDto(document: MeasurementModel): MeasurementDto {
    return {
      inverter: {
        serialNumber: document.inverterSerial,
        status: document.inverterStatus,
        temperature: document.inverterTemperature,
      },
      time: document.time,
      gridFrequency: document.gridFrequency,
      gridRelay: document.gridRelay,
      hoursOfFeed: document.hoursOfFeed,
      hoursOfOperation: document.hoursOfOperation,
      production: {
        current: {
          ac: {
            current: {
              1: document.acCurrent1,
              2: document.acCurrent2,
              3: document.acCurrent3,
            },
            power: {
              1: document.acPower1,
              2: document.acPower2,
              3: document.acPower3,
            },
            voltage: {
              1: document.acVoltage1,
              2: document.acVoltage2,
              3: document.acVoltage3,
            },
          },
          dc: {
            current: { 1: document.dcCurrent1, 2: document.dcCurrent2 },
            power: { 1: document.dcPower1, 2: document.dcPower2 },
            voltage: { 1: document.dcVoltage1, 2: document.dcVoltage2 },
          },
        },
        today: document.productionToday,
        total: document.productionTotal,
      },
      sunRise: document.sunRise,
      sunSet: document.sunSet,
    };
  }

  private toMeasurementModel(dto: MeasurementDto): MeasurementModel {
    return {
      id: uuidv4(),
      time: dto.time,

      inverterSerial: dto.inverter.serialNumber,
      inverterStatus: dto.inverter.status,
      inverterTemperature: dto.inverter.temperature,
      hoursOfFeed: dto.hoursOfFeed,
      hoursOfOperation: dto.hoursOfOperation,
      gridRelay: dto.gridRelay,
      gridFrequency: dto.gridFrequency,

      sunRise: dto.sunRise,
      sunSet: dto.sunSet,

      productionToday: dto.production.today,
      productionTotal: dto.production.total,

      acCurrent1: dto.production.current.ac.current['1'],
      acCurrent2: dto.production.current.ac.current['2'],
      acCurrent3: dto.production.current.ac.current['3'],
      acPower1: dto.production.current.ac.power['1'],
      acPower2: dto.production.current.ac.power['2'],
      acPower3: dto.production.current.ac.power['3'],
      acVoltage1: dto.production.current.ac.voltage['1'],
      acVoltage2: dto.production.current.ac.voltage['2'],
      acVoltage3: dto.production.current.ac.voltage['3'],
      dcCurrent1: dto.production.current.dc.current['1'],
      dcCurrent2: dto.production.current.dc.current['2'],
      dcPower1: dto.production.current.dc.power['1'],
      dcPower2: dto.production.current.dc.power['2'],
      dcVoltage1: dto.production.current.dc.voltage['1'],
      dcVoltage2: dto.production.current.dc.voltage['2'],
    };
  }
}
