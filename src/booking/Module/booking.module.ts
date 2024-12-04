import { Module } from '@nestjs/common';
import { BookingService } from '../Service/booking.service.js';
import { BookingController } from '../Controller/booking.controller.js';
import { MongooseModule } from '@nestjs/mongoose';
import { Booking, BookingSchema } from '../booking.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Booking.name, schema: BookingSchema }]),
  ],
  providers: [BookingService],
  controllers: [BookingController],
})
export class BookingModule {}
