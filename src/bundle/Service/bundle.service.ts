import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Bundle } from '../bundle.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class BundleService {
  constructor(
    @InjectModel(Bundle.name) private readonly bundleModel: Model<Bundle>,
  ) {}

  async createBundle(bundleType: string, days: number): Promise<Bundle> {
    const existingBundle = await this.bundleModel.findOne({
      $or: [{ bundleType }],
    });

    if (existingBundle) {
      throw new ConflictException('The Bundle Exists');
    }

    const newBundle = new this.bundleModel({ bundleType, days });
    return await newBundle.save();
  }

  async getBundles(): Promise<Bundle[]> {
    return await this.bundleModel.find().select('bundleType days').exec();
  }

  async getBundleById(id: string): Promise<Bundle> {
    const bundle = await this.bundleModel.findById(id).exec();
    if (!bundle) {
      throw new NotFoundException('Bundle not Found');
    }
    return bundle;
  }
  async updateBundle(id: string, updateData: Partial<Bundle>): Promise<void> {
    const result = await this.bundleModel
      .updateOne({ _id: id }, { $set: updateData })
      .exec();

    if (result.matchedCount === 0) {
      throw new NotFoundException('Bundle not Found');
    }
  }

  async deleteBundle(id: string): Promise<void> {
    const result = await this.bundleModel.deleteOne({ _id: id }).exec();

    if (result.deletedCount === 0) {
      throw new NotFoundException('Bundle not Found');
    }
  }
}
