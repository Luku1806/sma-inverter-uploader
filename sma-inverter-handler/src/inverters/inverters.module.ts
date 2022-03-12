import { Module } from '@nestjs/common';
import { InvertersController } from './inverters.controller';
import { InvertersService } from './inverters.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  MeasurementModel,
  MeasurementSchema,
} from '../measurements/measurement.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MeasurementModel.name, schema: MeasurementSchema },
    ]),
  ],
  controllers: [InvertersController],
  providers: [InvertersService],
  exports: [InvertersService],
})
export class InvertersModule {}
