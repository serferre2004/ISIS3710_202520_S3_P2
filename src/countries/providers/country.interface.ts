export interface CountryInterface {
  getCountryByCode(code: string): Promise<{
    cca3: string;
    name: string;
    region: string;
    subregion: string;
    capital: string;
    population: number;
    flag: string;
  }>;
}
