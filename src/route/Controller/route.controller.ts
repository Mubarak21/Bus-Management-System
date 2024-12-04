import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { Route } from '../route.schema';
import { RouteService } from '../Service/route.service';

@Controller('route')
export class RouteController {
  constructor(private readonly routeService: RouteService) {}

  @Get()
  async getRoutes(): Promise<Route[]> {
    return await this.routeService.getRoutes();
  }

  @Get(':id')
  async getRouteById(@Param('id') id: string): Promise<Route> {
    return await this.routeService.getRouteById(id);
  }

  @Patch(':id')
  async updateRoute(
    @Param('id') id: string,
    @Body() updateData: Partial<Route>,
  ): Promise<{ message: string }> {
    await this.routeService.updateRoute(id, updateData);
    return { message: 'Route Updated' };
  }

  @Delete(':id')
  async deleteRoute(@Param('id') id: string): Promise<{ message: string }> {
    await this.routeService.deleteRoute(id);
    return { message: 'Route Deleted' };
  }
}
