import { Controller, Delete, Get, Param, UseGuards } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { ApiKeyGuard } from 'src/common/guards/api-key.guard';

@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Get('code/:code')
  async getCountryByCode(@Param('code') code: string) {
    return this.countriesService.findByCode(code);
  }

  @Get('all')
  async getAll() {
    return this.countriesService.findAll();
  }

  @UseGuards(ApiKeyGuard)
  @Delete('/:code')
  async deleteCountryFromCache(@Param('code') code: string) {
    return this.countriesService.deleteFromCache(code);
  }
}
