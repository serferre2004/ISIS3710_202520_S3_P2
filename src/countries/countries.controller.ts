import { Controller, Get, Param } from '@nestjs/common';
import { CountriesService } from './countries.service';

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
}
