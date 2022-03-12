import { Module } from '@nestjs/common';
import { ProductionController } from './production.controller';
import { ProductionService } from './production.service';
import { MeasurementsModule } from '../measurements/measurements.module';

@Module({
  imports: [MeasurementsModule],
  controllers: [ProductionController],
  providers: [ProductionService],
})
export class ProductionModule {}
