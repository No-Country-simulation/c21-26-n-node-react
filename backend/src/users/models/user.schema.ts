/* import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
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
  students: User[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  parents: User[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Course' }] })
  courses: Course[];
}

export const UserSchema = SchemaFactory.createForClass(User);
 */

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';
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

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  students: User[]; // Ahora más claro, ya que referencia a otros usuarios

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  parents: User[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }] })
  courses?: Course[]; // Los cursos de este usuario (profesor)
}

export const UserSchema = SchemaFactory.createForClass(User);
