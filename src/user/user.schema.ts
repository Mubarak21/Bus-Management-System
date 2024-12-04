import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true })
  username: string;
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ require: true })
  password: string;

  @Prop({ require: true })
  phone: number;

  @Prop({})
  isActive: boolean;

  @Prop({})
  createdAt: Date;

  @Prop({})
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
