import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderDocument } from './schemas/order.schema';

@Injectable()
export class OrdersService {
  constructor(@InjectModel('Order') private orderModel: Model<OrderDocument>) {}

  async create(createOrderDto: CreateOrderDto) {
    const res = await this.orderModel.create(createOrderDto);
    return res.populate('items.productId');
  }

  findAll() {
    return this.orderModel.find().populate('items.productId');
  }

  findOne(id: string) {
    return this.orderModel.findById(id).populate('items.productId');
  }

  update(id: string, updateOrderDto: UpdateOrderDto) {
    return this.orderModel.findByIdAndUpdate(id, updateOrderDto);
  }

  remove(id: string) {
    return this.orderModel.findByIdAndDelete(id);
  }
}
