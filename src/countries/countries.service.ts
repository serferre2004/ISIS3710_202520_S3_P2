import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Country } from './schemas/country.schema';
import { RestCountriesProvider } from './providers/rest-countries.provider';
import { TravelPlansService } from 'src/travel-plans/travel-plans.service';

@Injectable()
export class CountriesService {
  constructor(
    @InjectModel(Country.name) private countryModel: Model<Country>,
    private restCountriesProvider: RestCountriesProvider,
    @Inject(forwardRef(() => TravelPlansService))
    private travelPlansService: TravelPlansService,
  ) {}

  async findByCode(code: string): Promise<Country> {
    let country = await this.countryModel.findOne({ cca3: code }).exec();
    let source = 'cache';
    if (!country) {
      const countryData =
        await this.restCountriesProvider.getCountryByCode(code);
      const created = await this.countryModel.create(countryData);
      country = created;
      source = 'api';
    }
    country.source = source;
    return country;
  }

  async findAll(): Promise<Country[]> {
    return this.countryModel.find().exec();
  }

  async deleteFromCache(code: string) {
    const inUse = await this.travelPlansService.countryInUse(code);
    if (inUse) {
      throw new Error('País tiene un plan de viaje, no puede ser eliminado');
    }
    const deleted = this.countryModel.deleteOne({ cca3: code }).exec();
    if ((await deleted).deletedCount === 0) {
      throw new Error('País no encontrado en caché');
    }
  }
}
