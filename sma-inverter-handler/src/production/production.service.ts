import { Injectable } from '@nestjs/common';
import { MeasurementsService } from '../measurements/measurements.service';
import { MeasurementDto } from '../measurements/measurement.dto';
import { ProductionDto } from './production.dto';

@Injectable()
export class ProductionService {
  constructor(private readonly measurementsService: MeasurementsService) {}

  public async getTotalProduction(): Promise<ProductionDto> {
    const serials = await this.measurementsService.getLatestForAll();

    return {
      today: serials.reduce(
        (total, measurement) => total + measurement.production.today,
        0,
      ),
      total: serials.reduce(
        (total, measurement) => total + measurement.production.total,
        0,
      ),
      current: {
        dc:
          serials.reduce((total, measurement) => {
            const power = measurement.production.current.dc.power;
            return total + power['1'] + power['2'];
          }, 0) / 1000,
        ac:
          serials.reduce((total, measurement) => {
            const power = measurement.production.current.ac.power;
            return total + power['1'] + power['2'] + power['3'];
          }, 0) / 1000,
      },
    };
  }
}
