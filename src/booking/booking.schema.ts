import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Booking extends Document {
  @Prop({ required: true })
  pickUp: string;

  @Prop({ required: true })
  bookingDate: Date;

  @Prop({ required: true })
  dropOff: string;

  @Prop({ required: true })
  tripeDate: Date;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  user: Types.ObjectId;
}
export const BookingSchema = SchemaFactory.createForClass(Booking);
