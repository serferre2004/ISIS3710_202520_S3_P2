import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TravelPlan } from './schemas/travel-plan.schema';
import { TravelPlanDto } from './dto/travel-plan.dto';
import { CountriesService } from '../countries/countries.service';

@Injectable()
export class TravelPlansService {
  constructor(
    @InjectModel(TravelPlan.name) private travelPlanModel: Model<TravelPlan>,
    private countriesService: CountriesService,
  ) {}

  async create(dto: TravelPlanDto) {
    const country = await this.countriesService.findByCode(dto.countryCode);
    const plan = await this.travelPlanModel.create({
      ...dto,
      countryCode: country.cca3,
    });
    return plan;
  }

  async findAll(): Promise<TravelPlan[]> {
    return this.travelPlanModel.find().exec();
  }

  async findById(id: string): Promise<TravelPlan> {
    const travelPlan = await this.travelPlanModel.findById(id).exec();
    if (!travelPlan) {
      throw new Error('Travel plan not found');
    }
    return travelPlan;
  }
}
