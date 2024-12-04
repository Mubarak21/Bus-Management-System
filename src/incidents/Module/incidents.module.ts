import { Module } from '@nestjs/common';
import { IncidentsService } from '../Service/incidents.service.js';
import { IncidentsController } from '../Controller/incidents.controller.js';

@Module({
  providers: [IncidentsService],
  controllers: [IncidentsController],
})
export class IncidentsModule {}
