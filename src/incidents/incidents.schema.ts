import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Incident extends Document {
  @Prop({ required: true })
  accident: string;

  @Prop({ type: Types.ObjectId, ref: 'Bus' })
  bus: Types.ObjectId;
}

export const IncidentSchema = SchemaFactory.createForClass(Incident);
