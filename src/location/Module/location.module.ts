import { Module } from '@nestjs/common';
import { LocationController } from '../Controller/location.controller.js';
import { LocationService } from '../Service/location.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Location, LocationSchema } from '../location.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Location.name, schema: LocationSchema },
    ]),
  ],
  controllers: [LocationController],
  providers: [LocationService],
})
export class LocationModule {}
