import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private UserModel: Model<UserDocument>) {}

  create(createUserDto: CreateUserDto) {
    return this.UserModel.create(createUserDto);
  }

  findAll() {
    return this.UserModel.find().exec();
  }

  findByEmail(email: string) {
    return this.UserModel.findOne({ email }).exec();
  }

  findOne(id: string) {
    return this.UserModel.findById(id).exec();
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.UserModel.findByIdAndUpdate(id, updateUserDto);
  }

  remove(id: string) {
    return this.UserModel.findByIdAndDelete(id);
  }
}
