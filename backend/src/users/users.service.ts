import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './models/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { UserResponseDto } from './dto/login-response-dto';
import { v4 as uuidv4 } from 'uuid'; //
import { EmailService } from 'src/email/email.service';
import { ResetEmail } from './dto/recovery-email.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService,
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

  async login(loginUserDto: LoginUserDto): Promise<UserResponseDto> {
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

      return {
        access_token: token, // Enviar el token al frontend
        _id: user.id,
        role: user.role,
        email: user.email,
        username: user.username,
      };
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async getProfile(user: UserResponseDto) {
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
      //console.log(request.headers.authorization, 'valido desde el front');
      const authHeader = request.headers.authorization;
      if (!authHeader) {
        throw new UnauthorizedException('Unauthorized');
      }

      const token = authHeader.split(' ')[1];
      if (!token) {
        throw new UnauthorizedException('Unauthorized');
      }

      const decodedToken = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      const userFound = await this.userModel.findOne({ _id: decodedToken._id });

      if (!userFound) {
        throw new UnauthorizedException('Unauthorized');
      }

      return {
        _id: userFound._id,
        email: userFound.email,
        role: userFound.role,
        name: userFound.username,
      };
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async update(request: any, updateUserDto: UpdateUserDto) {
    try {
      const authHeader = request.headers.authorization;
      if (!authHeader) {
        throw new UnauthorizedException('Unauthorized');
      }

      const token = authHeader.split(' ')[1];
      if (!token) {
        throw new UnauthorizedException('Unauthorized');
      }

      const decodedToken = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      const userFound = await this.userModel.findOne({ _id: decodedToken._id });

      if (!userFound) {
        throw new UnauthorizedException('Unauthorized');
      }
      const updateFields: UpdateUserDto = {};
      if (updateUserDto.password) {
        updateFields.password = await bcrypt.hash(updateUserDto.password, 10);
      }
      console.log(updateUserDto.username, 'dto');
      if (updateUserDto.username) {
        updateFields.username = updateUserDto.username;
      }
      const updatedUser = await this.userModel.findByIdAndUpdate(
        { _id: decodedToken._id },
        { $set: updateFields },
        { new: true },
      );

      return updatedUser;
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async forgotPassword(email: ResetEmail) {
    try {
      const recoveryCode = uuidv4().substring(0, 6);
      const user = await this.userModel.findOne({ email: email.email });
      if (!user) {
        throw new HttpException('Wrong Email', 404);
      }

      await this.emailService.sendRecoveryEmail(email.email, recoveryCode);

      return {
        message: 'Correo de recuperación enviado',
      };
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }
}
