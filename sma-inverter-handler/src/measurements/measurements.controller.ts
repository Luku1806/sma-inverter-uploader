import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { MeasurementDto } from './measurement.dto';
import { MeasurementsService } from './measurements.service';
import { countDtoFor, MeasurementCountDto } from './measurementCount.dto';

@Controller('measurements')
export class MeasurementsController {
  constructor(private readonly measurementsService: MeasurementsService) {}

  @Post()
  public addMeasurement(
    @Body() measurement: MeasurementDto,
  ): Promise<MeasurementDto> {
    return this.measurementsService.addMeasurement(measurement);
  }

  @Get()
  public getAllMeasurements(
    @Query('inverter') inverterSerial?: string,
  ): Promise<MeasurementDto[]> {
    if (inverterSerial != undefined) {
      const serial = parseInt(inverterSerial, 10);
      return this.measurementsService.getAllForInverter(serial);
    }

    return this.measurementsService.getAll();
  }

  @Get('/count')
  public async countMeasurements(
    @Query('inverter') inverterSerial?: string,
  ): Promise<MeasurementCountDto> {
    if (inverterSerial != undefined) {
      const serial = parseInt(inverterSerial, 10);
      return countDtoFor(
        await this.measurementsService.countAllForInverter(serial),
      );
    }

    return countDtoFor(await this.measurementsService.countAll());
  }
}
