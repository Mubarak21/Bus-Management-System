import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Route } from '../route.schema';
import type { Model } from 'mongoose';

@Injectable()
export class RouteService {
  constructor(
    @InjectModel(Route.name) private readonly routeModel: Model<Route>,
  ) {}

  async createRoute(
    startLocation: string,
    endLocation: string,
    routePrice: number,
  ): Promise<Route> {
    const existingRoute = await this.routeModel.findOne({
      $or: [{ startLocation }, { endLocation }],
    });

    if (existingRoute) {
      throw new ConflictException('The Route already Exists');
    }

    const newRoute = new this.routeModel({
      startLocation,
      endLocation,
      routePrice,
    });
    return await newRoute.save();
  }

  async getRoutes(): Promise<Route[]> {
    return await this.routeModel
      .find()
      .select('startLocation endLocation routePrice')
      .exec();
  }

  async getRouteById(id: string): Promise<Route> {
    const route = await this.routeModel.findById(id).exec();
    if (!route) {
      throw new NotFoundException('Route not Found');
    }
    return route;
  }

  async updateRoute(id: string, updateData: Partial<Route>): Promise<void> {
    const result = await this.routeModel
      .updateOne({ _id: id }, { $set: updateData })
      .exec();

    if (result.matchedCount === 0) {
      throw new NotFoundException('Route not Found');
    }
  }

  async deleteRoute(id: string): Promise<void> {
    const result = await this.routeModel.deleteOne({ _id: id }).exec();

    if (result.deletedCount === 0) {
      throw new NotFoundException('Route not Found');
    }
  }
}
