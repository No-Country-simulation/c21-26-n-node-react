import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Req,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from 'src/users/decorators/roles.decorator';
import { AuthGuard } from './../users/guard/auth.guard';
import { RolesGuard } from 'src/users/guard/roles.guard';
import { AssignStudentDto } from './dto/assgn-student.dto';

@ApiTags('Courses')
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Create a new course for teacher users',
  })
  @ApiResponse({ status: 200, description: 'Course created.' })
  @ApiResponse({ status: 404, description: 'Course not found.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('teacher')
  @Post()
  create(@Body() createCourseDto: CreateCourseDto, @Req() request: Request) {
    return this.coursesService.create(createCourseDto, request);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('student')
  @Post('assign')
  assignStudent(
    @Body() assignStudentDto: AssignStudentDto,
    @Req() request: Request,
  ) {
    return this.coursesService.assignStudent(assignStudentDto, request);
  }

  @ApiOperation({
    summary: 'Return all public courses',
  })
  @ApiResponse({ status: 200, description: 'Course found' })
  @ApiResponse({ status: 404, description: 'Course not found.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @Get()
  findAll() {
    return this.coursesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coursesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.coursesService.update(+id, updateCourseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coursesService.remove(+id);
  }
}
