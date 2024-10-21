import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { User } from 'src/users/models/user.schema';

export type CourseDocument = Course & Document;

@Schema()
export class Course {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ type: [{ type: String }] })
  images: string[]; // Para almacenar rutas de imágenes (si aplica)

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  teacher: User; // Referencia al maestro que creó el curso

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  students: Types.ObjectId[]; // Lista de estudiantes inscritos en el curso
}

export const CourseSchema = SchemaFactory.createForClass(Course);
