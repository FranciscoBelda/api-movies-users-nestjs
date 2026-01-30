import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schema/user.schema/user.schema';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature(
      [
        {
          name: 'User',
          schema: UserSchema,
        }
      ]
    ),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {expiresIn: '3h'}
    })
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
