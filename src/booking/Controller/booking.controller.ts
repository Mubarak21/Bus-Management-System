import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { BookingService } from '../Service/booking.service';
import { Booking } from '../booking.schema';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}
  @Post('schedule')
  async createBooking(
    @Body('pickUp') pickUp: string,
    @Body('bookingDate') bookingDate: Date,
    @Body('dropOff') dropOff: string,
    @Body('tripDate') tripDate: Date,
  ): Promise<{ message: string; booking: Booking }> {
    const newBooking = await this.bookingService.createBooking(
      pickUp,
      bookingDate,
      dropOff,
      tripDate,
    );
    return { message: 'Booking has been Created', booking: newBooking };
  }

  @Get()
  async getBookings(): Promise<Booking[]> {
    return await this.bookingService.getBookings();
  }

  @Get(':id')
  async getBookingById(@Param('id') id: string): Promise<Booking> {
    return await this.bookingService.getBookingById(id);
  }

  @Patch(':id')
  async updateBooking(
    @Param('id') id: string,
    @Body() updateData: Partial<Booking>,
  ): Promise<{ message: string }> {
    await this.bookingService.updateBooking(id, updateData);
    return { message: ' Booking Updated' };
  }

  @Delete(':id')
  async deleteBooking(@Param('id') id: string): Promise<{ message: string }> {
    await this.bookingService.deleteBooking(id);
    return { message: 'Booking Deleted' };
  }
}
