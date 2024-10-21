import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Course } from 'src/courses/entities/course.entity';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({
    type: String,
    enum: ['teacher', 'student', 'parent'],
    default: 'student',
  })
  role: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  students: User[]; // Padres pueden tener varios estudiantes (hijos)

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  parents: User[]; // Estudiantes pueden tener uno o más padres

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Course' }] })
  courses: Course[]; // Los maestros pueden tener varios cursos
}

export const UserSchema = SchemaFactory.createForClass(User);
