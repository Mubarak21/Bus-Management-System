import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Route extends Document {
  @Prop({ required: true })
  startLocation: string;

  @Prop({ required: true })
  endLocation: string;

  @Prop({ required: true })
  routePrice: number;

  @Prop({ type: Types.ObjectId, ref: 'Location' })
  location: Types.ObjectId;
}
export const RouteSchema = SchemaFactory.createForClass(Route);
