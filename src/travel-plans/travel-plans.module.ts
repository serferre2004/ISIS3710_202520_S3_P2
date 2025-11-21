import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TravelPlansController } from './travel-plans.controller';
import { TravelPlansService } from './travel-plans.service';
import { TravelPlan, TravelPlanSchema } from './schemas/travel-plan.schema';
import { CountriesModule } from '../countries/countries.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TravelPlan.name, schema: TravelPlanSchema },
    ]),
    forwardRef(() => CountriesModule),
  ],
  controllers: [TravelPlansController],
  providers: [TravelPlansService],
  exports: [TravelPlansService],
})
export class TravelPlansModule {}
