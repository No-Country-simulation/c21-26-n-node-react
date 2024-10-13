import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './entities/user.entity';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { UserResponseDto } from './dto/login-response-dto';
import { Response } from 'express';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
      const userFound = await this.userModel.findOne({
        email: createUserDto.email,
      });
      if (userFound) {
        throw new HttpException('User already exists', 409);
      }
      const newUser = await this.userModel.create({
        ...createUserDto,
        password: hashedPassword,
      });

      return await newUser.save();
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async login(
    loginUserDto: LoginUserDto,
    response: Response,
  ): Promise<UserResponseDto> {
    try {
      const user = await this.userModel.findOne({ email: loginUserDto.email });
      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }
      const isPasswordMatch = await bcrypt.compare(
        loginUserDto.password,
        user.password,
      );
      if (!isPasswordMatch) {
        throw new UnauthorizedException('Invalid credentials');
      }
      const payload = {
        _id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
      };
      const token = await this.jwtService.signAsync(payload);

      response.cookie('token', token, {
        httpOnly: false, // Solo accesible a través de HTTP (no JavaScript)
        secure: true,
        sameSite: 'none', // Asegura que las cookies sean aceptadas en requests cross-site
      });

      return {
        access_token: await this.jwtService.signAsync(payload),
        _id: user.id,
        role: user.role,
      };
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async getProfile(user: any) {
    try {
      const result = await this.userModel
        .findById({ _id: user })
        .select('-password');
      if (!result) {
        throw new HttpException('User not found', 404);
      }
      return result;
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(id: string) {
    try {
      const result = await this.userModel
        .findById({ _id: id })
        .select('-password');
      if (!result) {
        throw new HttpException('User not found', 404);
      }
      return result;
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async verify(request: any) {
    try {
      const token = request.cookies?.token;
      if (!token) {
        throw new UnauthorizedException('Unauthorized');
      }
      const resToken = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      const userFound = await this.userModel.findOne({ _id: resToken._id });

      console.log('User found:', userFound);
      if (!userFound) {
        throw new UnauthorizedException('Unauthorized');
      }
      return {
        _id: userFound._id,
        email: userFound.email,
        role: userFound.role,
      };
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
