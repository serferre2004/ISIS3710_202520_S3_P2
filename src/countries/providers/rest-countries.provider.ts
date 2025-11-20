/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CountryInterface } from './country.interface';
import axios from 'axios';

@Injectable()
export class RestCountriesProvider implements CountryInterface {
  async getCountryByCode(code: string) {
    try {
      const url = `https://restcountries.com/v3.1/alpha/${code}`;
      const { data } = await axios.get(url);

      if (!data || data.length === 0) {
        throw new NotFoundException(`${code} no encontrado`);
      }

      const raw = data[0];

      return {
        cca3: raw.cca3,
        name: raw.name?.common ?? '',
        region: raw.region ?? '',
        subregion: raw.subregion ?? '',
        capital: Array.isArray(raw.capital) ? raw.capital[0] : '',
        population: raw.population ?? 0,
        flag: raw.flags?.png ?? '',
      };
    } catch (error) {
      console.error(`Error ${code}:`, error);
      throw new NotFoundException(`No fue posiblr cargar el país ${code}`);
    }
  }
}
