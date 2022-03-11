import { Module } from '@nestjs/common';
import { MeasurementsController } from './measurements.controller';
import { MeasurementsService } from './measurements.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MeasurementModel, MeasurementSchema } from './measurement.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MeasurementModel.name, schema: MeasurementSchema },
    ]),
  ],
  controllers: [MeasurementsController],
  providers: [MeasurementsService],
})
export class MeasurementsModule {}
