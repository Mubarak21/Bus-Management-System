import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { LocationService } from '../Service/location.service';
import { Location } from '../location.schema';

@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post('stops')
  async createLocation(
    @Body('name') name: string,
    @Body('latitude') latitude: number,
    @Body('longitude') longitude: number,
    @Body('stops') stops: string,
  ): Promise<{ message: string; location: Location }> {
    const newLocation = await this.locationService.createLocation(
      name,
      latitude,
      longitude,
      stops,
    );
    return { message: 'Location has been created', location: newLocation };
  }

  @Get()
  async getLocations(): Promise<Location[]> {
    return await this.locationService.getLocations();
  }

  @Get(':id')
  async getLocationById(@Param('id') id: string): Promise<Location> {
    return await this.locationService.getLocationById(id);
  }

  @Patch(':id')
  async updateLocation(
    @Param('id') id: string,
    @Body() updateData: Partial<Location>,
  ): Promise<{ message: string }> {
    await this.locationService.updateLocation(id, updateData);
    return { message: 'location Updated' };
  }
  @Delete(':id')
  async deleteLocation(@Param('id') id: string): Promise<{ message: string }> {
    await this.locationService.deleteLocation(id);
    return { message: 'Location Deleted' };
  }
}
