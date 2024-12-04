import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Bus } from '../bus.schema';
import { Model } from 'mongoose';

@Injectable()
export class BusService {
  constructor(@InjectModel(Bus.name) private readonly busModel: Model<Bus>) {}

  async createBus(
    plateNumber: string,
    startTime: string,
    endTime: string,
    status: string,
    capacity: number,
  ): Promise<Bus> {
    const existingBus = await this.busModel.findOne({
      $or: [{ plateNumber }],
    });

    if (existingBus) {
      throw new ConflictException('Bus already Exists');
    }

    const newBus = new this.busModel({
      plateNumber,
      startTime,
      endTime,
      status,
      capacity,
    });
    return await newBus.save();
  }

  async getBuses(): Promise<Bus[]> {
    return await this.busModel.find().select('plateNumber capacity').exec();
  }

  async getBusById(id: string): Promise<Bus> {
    const bus = await this.busModel.findById(id).exec();
    if (!bus) {
      throw new NotFoundException('Bus not found');
    }
    return bus;
  }

  async updateBus(id: string, updateData: Partial<Bus>): Promise<void> {
    const result = await this.busModel
      .updateOne({ _id: id }, { $set: updateData })
      .exec();
    if (result.matchedCount === 0) {
      throw new NotFoundException('Bus not found');
    }
  }

  async deleteBus(id: string): Promise<void> {
    const result = await this.busModel.deleteOne({ _id: id }).exec();

    if (result.deletedCount === 0) {
      throw new NotFoundException('Bus not found');
    }
  }
}
