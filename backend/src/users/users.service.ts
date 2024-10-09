import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './entities/user.entity';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { access } from 'fs';
import { UserResponseDto } from './dto/login-response-dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private JwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
      console.log(hashedPassword);
      const newUser = await this.userModel.create({
        ...createUserDto,
        password: hashedPassword,
      });

      return await newUser.save();
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async login(loginUserDto: LoginUserDto): Promise<UserResponseDto> {
    try {
      const user = await this.userModel.findOne({ email: loginUserDto.email });
      if (!user) {
        throw new HttpException('Invalid credentials', 404);
      }
      const isPasswordMatch = await bcrypt.compare(
        loginUserDto.password,
        user.password,
      );
      if (!isPasswordMatch) {
        throw new HttpException('Invalid credentials', 401);
      }
      const payload = {
        id: user.id,
        email: user.email,
        username: user.username,
      };

      return {
        access_token: this.JwtService.sign(payload),
        email: user.email,
        username: user.username,
      };
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
