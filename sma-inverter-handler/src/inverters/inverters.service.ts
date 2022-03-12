import { Injectable } from '@nestjs/common';
import { MeasurementDto } from '../measurements/measurement.dto';
import { InjectModel } from '@nestjs/mongoose';
import { MeasurementModel } from '../measurements/measurement.schema';
import { Model } from 'mongoose';

@Injectable()
export class InvertersService {
  constructor(
    @InjectModel(MeasurementModel.name)
    private readonly measurementModel: Model<MeasurementModel>,
  ) {}

  public async getAllSerials(): Promise<number[]> {
    return this.measurementModel.distinct('inverterSerial');
  }
}
