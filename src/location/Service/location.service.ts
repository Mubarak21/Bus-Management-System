import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Location } from '../location.schema';

@Injectable()
export class LocationService {
  constructor(
    @InjectModel(Location.name) private readonly locationModel: Model<Location>,
  ) {}

  async createLocation(
    name: string,
    latitude: number,
    longitude: number,
    stops: string,
  ): Promise<Location> {
    const existingLocation = await this.locationModel.findOne({
      $or: [{ name }, { stops }],
    });
    if (existingLocation) {
      throw new ConflictException('Location already exists');
    }

    const newLocation = new this.locationModel({
      name,
      latitude,
      longitude,
      stops,
    });
    return await newLocation.save();
  }

  async getLocations(): Promise<Location[]> {
    return await this.locationModel.find().select('name stops').exec();
  }
  async getLocationById(id: string): Promise<Location> {
    const location = await this.locationModel.findById(id).exec();
    if (!location) {
      throw new NotFoundException('Location not Found');
    }
    return location;
  }
  async updateLocation(
    id: string,
    updateData: Partial<Location>,
  ): Promise<void> {
    const result = await this.locationModel
      .updateOne({ _id: id }, { $set: updateData })
      .exec();
    if (result.matchedCount === 0) {
      throw new NotFoundException('Location not Found');
    }
  }

  async deleteLocation(id: string): Promise<void> {
    const result = await this.locationModel.deleteOne({ _id: id }).exec();

    if (result.deletedCount === 0) {
      throw new NotFoundException('Locaiton not Found');
    }
  }
}
