import { Module } from '@nestjs/common';
import { BusController } from '../Controller/bus.controller.js';
import { BusService } from '../Service/bus.service.js';
import { MongooseModule } from '@nestjs/mongoose';
import { Bus, BusSchema } from '../bus.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Bus.name, schema: BusSchema }])],
  controllers: [BusController],
  providers: [BusService],
})
export class BusModule {}
