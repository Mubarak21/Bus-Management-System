import { Module } from '@nestjs/common';
import { RouteController } from '../Controller/route.controller.js';
import { RouteService } from '../Service/route.service.js';
import { MongooseModule } from '@nestjs/mongoose';
import { Route, RouteSchema } from '../route.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Route.name, schema: RouteSchema }]),
  ],
  controllers: [RouteController],
  providers: [RouteService],
})
export class RouteModule {}
