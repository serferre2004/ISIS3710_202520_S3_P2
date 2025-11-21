import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Country extends Document {
  @Prop({ required: true, unique: true })
  cca3: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  region: string;

  @Prop()
  subregion: string;

  @Prop()
  capital: string;

  @Prop()
  population: number;

  @Prop()
  flag: string;

  @Prop({ required: false })
  source?: string;
}

export const CountrySchema = SchemaFactory.createForClass(Country);
