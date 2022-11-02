import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private UserModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto) {
    return this.UserModel.create(createUserDto);
  }

  async findAll() {
    return this.UserModel.find().exec();
  }

  async findOne(id: string) {
    return this.UserModel.findById(id).exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return this.UserModel.findByIdAndUpdate(id, updateUserDto);
  }

  async remove(id: string) {
    return this.UserModel.findByIdAndDelete(id);
  }
}
