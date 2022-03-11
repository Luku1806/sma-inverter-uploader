import { v4 as uuidv4 } from 'uuid';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { NoIDAndVersionSchemaOptions } from '../schemaConstants';

@Schema({ ...NoIDAndVersionSchemaOptions, collection: 'measurements' })
export class MeasurementModel {
  @Prop({ unique: true, required: true, default: uuidv4 })
  id: string;

  @Prop({ required: true })
  inverterSerial: number;

  @Prop({ required: false })
  readonly inverterStatus: string;

  @Prop({ required: false })
  readonly inverterTemperature: number;

  @Prop({ required: true })
  readonly time: Date;

  @Prop({ required: false })
  readonly sunRise: Date;

  @Prop({ required: false })
  readonly sunSet: Date;

  @Prop({ required: false })
  readonly hoursOfOperation: number;

  @Prop({ required: false })
  readonly hoursOfFeed: number;

  @Prop({ required: false })
  readonly gridRelay: string;

  @Prop({ required: false })
  readonly gridFrequency: number;

  @Prop({ required: false })
  readonly productionTotal: number;

  @Prop({ required: false })
  readonly productionToday: number;

  @Prop({ required: false })
  readonly dcCurrent1: number;
  @Prop({ required: false })
  readonly dcCurrent2: number;
  @Prop({ required: false })
  readonly dcVoltage1: number;
  @Prop({ required: false })
  readonly dcVoltage2: number;
  @Prop({ required: false })
  readonly dcPower1: number;
  @Prop({ required: false })
  readonly dcPower2: number;

  @Prop({ required: false })
  readonly acCurrent1: number;
  @Prop({ required: false })
  readonly acCurrent2: number;
  @Prop({ required: false })
  readonly acCurrent3: number;
  @Prop({ required: false })
  readonly acVoltage1: number;
  @Prop({ required: false })
  readonly acVoltage2: number;
  @Prop({ required: false })
  readonly acVoltage3: number;
  @Prop({ required: false })
  readonly acPower1: number;
  @Prop({ required: false })
  readonly acPower2: number;
  @Prop({ required: false })
  readonly acPower3: number;
}

export type MeasurementDocument = MeasurementModel & Document;
export const MeasurementSchema = SchemaFactory.createForClass(MeasurementModel);
