import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { BusService } from '../Service/bus.service';
import { Bus } from '../bus.schema';

@Controller('bus')
export class BusController {
  constructor(private readonly busService: BusService) {}

  @Post('Register')
  async createBus(
    @Body('plateNumber') plateNumber: string,
    @Body('startTime') startTime: string,
    @Body('endTime') endTime: string,
    @Body('status') status: string,
    @Body('capacity') capacity: number,
  ): Promise<{ message: string; bus: Bus }> {
    const newBus = await this.busService.createBus(
      plateNumber,
      startTime,
      endTime,
      status,
      capacity,
    );
    return { message: 'Bus has been created', bus: newBus };
  }

  @Get()
  async getBuses(): Promise<Bus[]> {
    return await this.busService.getBuses();
  }

  @Get(':id')
  async getBusById(@Param('id') id: string): Promise<Bus> {
    return await this.busService.getBusById(id);
  }

  @Patch(':id')
  async updateBus(
    @Param('id') id: string,
    @Body() updateData: Partial<Bus>,
  ): Promise<{ message: string }> {
    await this.busService.updateBus(id, updateData);
    return { message: ' Bus Updated' };
  }

  @Delete(':id')
  async deleteBus(@Param('id') id: string): Promise<{ message: string }> {
    await this.busService.deleteBus(id);
    return { message: ' Bus Deleted' };
  }
}
