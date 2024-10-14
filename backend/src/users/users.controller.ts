import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthGuard } from './guard/auth.guard';
import { Roles } from './decorators/roles.decorator';
import { RolesGuard } from './guard/roles.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { JwtAuthGuard } from './jwt/jwt-auth.guard';

interface RequestWithUser extends Request {
  user: { email: string; role: string; _id: string };
}

export enum Role {
  User = 'user',
  Admin = 'admin',
}

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post('login')
  async login(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    return await this.usersService.login(loginUserDto, response);
  }
  @Post('forgot-password')
  async forgotPassword(@Body('email') email: string) {
    return await this.usersService.forgotPassword(email);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(AuthGuard, RolesGuard)
  //@Roles('student', 'teacher', 'father')
  @Get('profile')
  async getProfile(@Req() request) {
    const userId = request.user;
    console.log(userId._id);
    return this.usersService.getProfile(userId._id);
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('verify')
  async verify(@Req() request: RequestWithUser) {
    console.log('front');
    return this.usersService.verify(request);
  }

  @UseGuards(AuthGuard)
  @Roles('user')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
