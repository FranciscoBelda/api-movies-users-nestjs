import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { User } from './interface/user/user.interface';
import { UserDto } from './dto/user.dto/user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel('User')private userModel: Model<User> ) {
  }

  // Crear usuario - REGISTER
  async create(userDto: UserDto): Promise<User> {
    const newUser = new this.userModel(userDto);
    return await newUser.save();
  }

  // Acreditar usuario - LOGIN
  async findOne(condition: any): Promise<any> {
    return this.userModel.findOne(condition).exec();
  }
}
