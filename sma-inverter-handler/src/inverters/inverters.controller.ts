import { Body, Controller, Get, Post } from '@nestjs/common';
import { MeasurementDto } from '../measurements/measurement.dto';
import { InvertersService } from './inverters.service';

@Controller('inverters')
export class InvertersController {
  constructor(private readonly invertersService: InvertersService) {}

  @Get('/serials')
  public addMeasurement(
    @Body() measurement: MeasurementDto,
  ): Promise<number[]> {
    return this.invertersService.getAllSerials();
  }
}
