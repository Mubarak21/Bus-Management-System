import { Module } from '@nestjs/common';
import { BundleService } from '../Service/bundle.service.js';
import { BundleController } from '../Controller/bundle.controller.js';
import { MongooseModule } from '@nestjs/mongoose';
import { Bundle, BundleSchema } from '../bundle.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Bundle.name, schema: BundleSchema }]),
  ],
  providers: [BundleService],
  controllers: [BundleController],
})
export class BundleModule {}
