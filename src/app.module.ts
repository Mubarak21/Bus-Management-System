import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/module/user.module';
import { LocationModule } from './location/Module/location.module';
import { BusModule } from './bus/Module/bus.module';
import { RouteModule } from './route/Module/route.module';
import { BundleModule } from './bundle/Module/bundle.module';
import { BookingModule } from './booking/Module/booking.module';

@Module({
  imports: [
    UserModule,
    LocationModule,
    BusModule,
    RouteModule,
    BundleModule,
    BookingModule,
    MongooseModule.forRoot(
      'mongodb+srv://Mubaraka:Mu01bM7we98!@node-rest-shop.8hlxq.mongodb.net/bussystem?retryWrites=true&w=majority&appName=node-rest-shop',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
