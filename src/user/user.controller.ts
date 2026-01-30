import { Body, ConflictException, Controller, Get, InternalServerErrorException, Post, Req, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto/user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import express from 'express';

@Controller('api/v1/users')
export class UserController {
  constructor(private readonly userService: UserService,
              private readonly jwtService: JwtService
  ) {}

  @Post('register')
  async register(@Body() userDto: UserDto): Promise<any> {
    try{
      const hashedPassword =
        await bcrypt.hash(userDto.password, 12);
      const user = await this.userService.create({
        ...userDto,
        password: hashedPassword,
      });
      const jwt = await this.jwtService.signAsync({
        _id: user._id,
        email: user.email,
        avatar: user.avatar,
        username: user.username,
      });
      return {
        ok: true,
        token: jwt
      }
    }catch (e) {
      if (e.code === 11000){
        throw new ConflictException({
          ok: false,
          message: 'Username or email already exists'
        })
      }
      throw new InternalServerErrorException({
        ok: false,
        message: e.message,
      })
    }
  }

  @Post('login')
  async login(@Body('email') email: string,
              @Body('password') password: string,): Promise<any> {
    try{
      const user = await this.userService.findOne({email});
      if (!user) {
        throw new UnauthorizedException({
          ok: false,
          message: 'Incorrect email or password'
        })
      }
      if (!(await bcrypt.compare(password, user.password))) {
        throw new UnauthorizedException({
          ok: false,
          message: 'Incorrect email or password'
        })
      }
      const jwt = await this.jwtService.signAsync({
        _id: user._id,
        email: user.email,
        avatar: user.avatar,
        username: user.username,
      });
      return {
        ok: true,
        token: jwt
      }
    }catch (e) {
      if (e instanceof UnauthorizedException){
        throw e;
      }
      throw new InternalServerErrorException({
        ok: false,
        e: e.message
      })
    }
  }


  @Get('user-info')
  async userInfo(@Req()request: express.Request ): Promise<any> {
    try{
      const data = await this.jwtService.verifyAsync(
        request.get('x-token') as string
      );
      if (!data) {
        throw new UnauthorizedException({
          ok: false,
          message: 'Incorrect token'
        })
      }
      const user =
        await this.userService.findOne({email: data.email});

      return {
        ok: true,
        usuario: (({_id, email, username, avatar}) => ({
          _id, email, username, avatar
        }))(user)
      }
    }catch (e) {
      if (e instanceof UnauthorizedException){
        throw e;
      }
      throw new InternalServerErrorException({
        ok: false,
        message: e.message
      })
    }
  }
}
