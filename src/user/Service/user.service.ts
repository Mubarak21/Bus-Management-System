import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async createUser(
    username: string,
    email: string,
    phone: string,
    password: string,
  ): Promise<User> {
    const existingUser = await this.userModel.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      throw new ConflictException('Email or username already exists');
    }

    const newUser = new this.userModel({ username, email, phone, password });
    return await newUser.save();
  }

  async getUsers(): Promise<User[]> {
    return await this.userModel.find().select('username email').exec();
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException('User not Found');
    }
    return user;
  }

  async updateUser(id: string, updateData: Partial<User>): Promise<void> {
    const result = await this.userModel
      .updateOne({ _id: id }, { $set: updateData })
      .exec();

    if (result.matchedCount === 0) {
      throw new NotFoundException('User not found');
    }
  }

  async deleteUser(id: string): Promise<void> {
    const result = await this.userModel.deleteOne({ _id: id }).exec();

    if (result.deletedCount === 0) {
      throw new NotFoundException('User not found');
    }
  }
}
