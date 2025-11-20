import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TravelPlansService } from './travel-plans.service';
import { TravelPlanDto } from './dto/travel-plan.dto';

@Controller('travel-plans')
export class TravelPlansController {
  constructor(private readonly travelPlansService: TravelPlansService) {}

  @Get('all')
  async getAll() {
    return this.travelPlansService.findAll();
  }

  @Get('id/:id')
  async getById(@Param('id') id: string) {
    return this.travelPlansService.findById(id);
  }

  @Post('create')
  async create(@Body() dto: TravelPlanDto) {
    return this.travelPlansService.create(dto);
  }
}
