import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { CartDocument } from './schemas/cart.schema';

@Injectable()
export class CartsService {
  constructor(
    @InjectModel('Cart') private readonly cartModel: Model<CartDocument>,
  ) {}

  create(createCartDto: CreateCartDto) {
    return this.cartModel.create(createCartDto);
  }

  findAll() {
    return this.cartModel.find();
  }

  findOne(id: string) {
    return this.cartModel.findById(id);
  }

  update(id: string, updateCartDto: UpdateCartDto) {
    return this.cartModel.findByIdAndUpdate(id, updateCartDto);
  }

  remove(id: string) {
    return this.cartModel.findByIdAndDelete(id);
  }
}
