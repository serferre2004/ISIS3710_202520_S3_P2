import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: { createdAt: true, updatedAt: false } })
export class TravelPlan extends Document {
  @Prop({ required: true })
  countryCode: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  startDate: string;

  @Prop({ required: true })
  endDate: string;

  @Prop()
  notes?: string;
}

export const TravelPlanSchema = SchemaFactory.createForClass(TravelPlan);
