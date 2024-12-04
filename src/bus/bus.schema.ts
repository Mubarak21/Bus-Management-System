import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Bus extends Document {
  @Prop({ required: true })
  plateNumber: string;

  @Prop({ required: true })
  startTime: string;

  @Prop({ required: true })
  endTime: string;

  @Prop({ required: true })
  status: string;

  @Prop({ required: true })
  capacity: number;

  @Prop({ type: Types.ObjectId, ref: 'Route' })
  route: Types.ObjectId;
}
export const BusSchema = SchemaFactory.createForClass(Bus);
