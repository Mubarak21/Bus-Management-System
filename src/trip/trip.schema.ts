import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Trip extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Bus' })
  bus: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Booking' })
  booking: Types.ObjectId;
}

export const TripSchema = SchemaFactory.createForClass(Trip);
