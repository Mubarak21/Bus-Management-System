import { Module } from '@nestjs/common';
import { UserController } from '../Controller/user.controller';
import { UserService } from '../Service/user.service';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { User, UserSchema } from '../user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
