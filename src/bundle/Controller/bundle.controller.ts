import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Bundle } from '../bundle.schema';

@Controller('bundle')
export class BundleController {
  constructor(private readonly bundleService) {}

  @Post('Register')
  async createBundle(
    @Body('bundleType') bundleType: string,
    @Body('days') days: number,
  ): Promise<{ message: string; bundle: Bundle }> {
    const newBundle = await this.bundleService.createBundle(bundleType, days);
    return { message: 'Bundle has been created', bundle: newBundle };
  }

  @Get()
  async getBundles(): Promise<Bundle[]> {
    return await this.bundleService.getBundles();
  }

  @Get(':id')
  async getBundleById(@Param('id') id: string): Promise<Bundle> {
    return await this.bundleService.getBundleById(id);
  }

  @Patch(':id')
  async updateBundle(
    @Param('id') id: string,
    @Body() updateData: Partial<Bundle>,
  ): Promise<{ message: string }> {
    await this.bundleService.updateBundle(id, updateData);
    return { message: 'Bundle Updated' };
  }

  @Delete(':id')
  async deleteBundle(@Param('id') id: string): Promise<{ message: string }> {
    await this.bundleService.deleteBundle(id);
    return { message: 'Bundle Deleted' };
  }
}
