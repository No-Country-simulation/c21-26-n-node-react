import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { AuthService } from 'src/auth/auth.service';
import { JwtStrategy } from 'src/users/jwt/jwt-strategy';
import { EmailService } from 'src/email/email.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/users/models/user.schema';
import { CourseSchema } from './models/courses.schema';

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: config.get<string | number>('JWT_EXPIRES') },
      }),
    }),
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Course', schema: CourseSchema },
    ]),
  ],
  controllers: [CoursesController],
  providers: [CoursesService, AuthService, JwtStrategy, EmailService],
})
export class CoursesModule {}
