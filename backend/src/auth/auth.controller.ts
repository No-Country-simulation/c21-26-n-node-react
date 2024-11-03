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

import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { ResetEmail } from 'src/users/dto/recovery-email.dto';

import { RequestWithUser } from 'src/users/interfaces/request-with-user.interface';
import { JwtAuthGuard } from 'src/users/jwt/jwt-auth.guard';

export enum Role {
  User = 'user',
  Admin = 'admin',
}

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
  })
  @ApiResponse({ status: 409, description: 'User already exists.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({ summary: 'Login user and return JWT token' })
  @ApiResponse({ status: 200, description: 'User successfully logged in.' })
  @ApiResponse({ status: 401, description: 'Invalid credentials.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return await this.usersService.login(loginUserDto);
  }

  @ApiOperation({ summary: 'Send a recovery email for password reset' })
  @ApiResponse({ status: 200, description: 'Recovery email sent.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  @Post('forgot-password')
  async forgotPassword(@Body() email: ResetEmail) {
    return await this.usersService.forgotPassword(email);
  }

  @ApiOperation({ summary: 'Retrieve all users' })
  @ApiResponse({ status: 200, description: 'List of users.' })
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Verify user JWT token' })
  @ApiResponse({ status: 200, description: 'Token successfully verified.' })
  @ApiResponse({ status: 401, description: 'Invalid token or unauthorized.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  @UseGuards(JwtAuthGuard)
  @Get('verify')
  async verify(@Req() request: RequestWithUser) {
    return this.usersService.verify(request);
  }
}
