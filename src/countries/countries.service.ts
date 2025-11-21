import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Country } from './schemas/country.schema';
import { RestCountriesProvider } from './providers/rest-countries.provider';

@Injectable()
export class CountriesService {
  constructor(
    @InjectModel(Country.name) private countryModel: Model<Country>,
    private restCountriesProvider: RestCountriesProvider,
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
}
