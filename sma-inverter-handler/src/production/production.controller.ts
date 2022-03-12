import { Body, Controller, Get } from '@nestjs/common';
import { MeasurementDto } from '../measurements/measurement.dto';
import { ProductionService } from './production.service';
import { ProductionDto } from './production.dto';

@Controller('production')
export class ProductionController {
  constructor(private readonly productionService: ProductionService) {}

  @Get()
  public addMeasurement(
    @Body() measurement: MeasurementDto,
  ): Promise<ProductionDto> {
    return this.productionService.getTotalProduction();
  }
}
