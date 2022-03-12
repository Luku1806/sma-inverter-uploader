import { Module } from '@nestjs/common';
import { MeasurementsController } from './measurements.controller';
import { MeasurementsService } from './measurements.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MeasurementModel, MeasurementSchema } from './measurement.schema';
import { InvertersModule } from '../inverters/inverters.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MeasurementModel.name, schema: MeasurementSchema },
    ]),
    InvertersModule,
  ],
  controllers: [MeasurementsController],
  providers: [MeasurementsService],
  exports: [MeasurementsService],
})
export class MeasurementsModule {}
