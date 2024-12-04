import { Module } from '@nestjs/common';
import { TripService } from '../Service/trip.service.js';
import { TripController } from '../Controller/trip.controller.js';

@Module({
  providers: [TripService],
  controllers: [TripController],
})
export class TripModule {}
