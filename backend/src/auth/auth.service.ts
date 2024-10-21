import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/users/models/user.schema';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { UserResponseDto } from 'src/users/dto/login-response-dto';
import { ResetEmail } from 'src/users/dto/recovery-email.dto';
import { v4 as uuidv4 } from 'uuid';
import { EmailService } from 'src/email/email.service';
@Injectable()
export class AuthService {
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
