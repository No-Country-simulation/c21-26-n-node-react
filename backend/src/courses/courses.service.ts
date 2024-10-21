import { HttpException, Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { User, UserDocument } from 'src/users/models/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Course, CourseDocument } from './models/courses.schema';
import { AssignStudentDto } from './dto/assgn-student.dto';

@Injectable()
export class CoursesService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Course.name) private courseModel: Model<CourseDocument>,
  ) {}
  async create(createCourseDto: CreateCourseDto, request: any) {
    try {
      const res = await this.courseModel.create({
        ...createCourseDto,
        teacher: request.user._id,
      });
      return res.save();
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async assignStudent(assingStudentDto: AssignStudentDto, request: any) {
    try {
      const course = await this.courseModel.findOne({
        _id: assingStudentDto._id,
      });
      if (!course) {
        throw new HttpException('Course not found', 404);
      }
      const student = await this.userModel.findOne({ _id: request.user._id });
      if (!student) {
        throw new HttpException('Student not found', 404);
      }
      course.students.push(student._id);
      return await course.save();
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async findAll() {
    return await this.courseModel.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} course`;
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return `This action updates a #${id} course`;
  }

  remove(id: number) {
    return `This action removes a #${id} course`;
  }
}
