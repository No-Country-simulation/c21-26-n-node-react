import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';

export type CourseDocument = Course & Document;

@Schema()
export class Course {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ type: [{ type: String }] })
  images: string[];

  @Prop({ required: true, enum: ['Beginner', 'Intermediate', 'Advanced'] })
  level: string;

  @Prop()
  duration: number;

  @Prop({ type: [{ type: String }] })
  modules: string[];

  @Prop()
  prerequisites: string;

  @Prop({ type: [{ type: String }] })
  additionalResources: string[];

  @Prop()
  passingScore: number;

  @Prop({ required: true, enum: ['Active', 'Inactive'] })
  status: string;

  @Prop({ type: Date })
  startDate: Date;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  teacher: Types.ObjectId;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  students: Types.ObjectId[];
}

export const CourseSchema = SchemaFactory.createForClass(Course);
