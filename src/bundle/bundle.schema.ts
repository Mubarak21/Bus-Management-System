import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Bundle extends Document {
  @Prop({ required: false })
  bundleType: string;

  @Prop({ required: true })
  days: number;
}
export const BundleSchema = SchemaFactory.createForClass(Bundle);
