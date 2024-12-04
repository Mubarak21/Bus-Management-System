import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Booking } from '../booking.schema.js';
import { InjectModel } from '@nestjs/mongoose';
import type { Model } from 'mongoose';

@Injectable()
export class BookingService {
  constructor(
    @InjectModel(Booking.name) private readonly bookingModel: Model<Booking>,
  ) {}

  async createBooking(
    pickUp: string,
    bookingDate: Date,
    dropOff: string,
    tripDate: Date,
  ): Promise<Booking> {
    const existingBooking = await this.bookingModel.findOne({
      $or: [{}],
    });

    if (existingBooking) {
      throw new ConflictException(' Booking already exists');
    }
    const newBooking = new this.bookingModel({
      pickUp,
      bookingDate,
      dropOff,
      tripDate,
    });
    return await newBooking.save();
  }

  async getBookings(): Promise<Booking[]> {
    return await this.bookingModel
      .find()
      .select('pickUp bookingDate dropOff tripDate');
  }

  async getBookingById(id: string): Promise<Booking> {
    const booking = await this.bookingModel.findById(id).exec();
    if (!booking) {
      throw new NotFoundException('Booking not found');
    }
    return booking;
  }

  async updateBooking(id: string, updateData: Partial<Booking>): Promise<void> {
    const result = await this.bookingModel
      .updateOne({ _id: id }, { $set: updateData })
      .exec();
    if (result.matchedCount === 0) {
      throw new NotFoundException('Booking not Found');
    }
  }

  async deleteBooking(id: string): Promise<void> {
    const result = await this.bookingModel.deleteOne({ _id: id }).exec();

    if (result.deletedCount === 0) {
      throw new NotFoundException('Booking not Found');
    }
  }
}
