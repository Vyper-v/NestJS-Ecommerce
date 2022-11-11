import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { InvalidObjectId } from 'src/exceptions/invalidObjectId.exception';
import { MailService } from 'src/mail/mail.service';
import { User } from 'src/types/user';
import { inspect } from 'util';
import { CreateItemDTO } from './dto/create-item.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { CartNotFoundException } from './exceptions/CartNotFound.exception';
import { CartDocument } from './schemas/cart.schema';
import { OrderDocument } from './schemas/order.schema';

@Injectable()
export class CartsService {
  constructor(
    @InjectModel('Cart') private readonly cartModel: Model<CartDocument>,
    @InjectModel('Order') private readonly orderModel: Model<OrderDocument>,
    private readonly mailService: MailService,
  ) {}

  create(createCartDto: CreateItemDTO[], user: User) {
    return this.cartModel.create({
      products: createCartDto,
      email: user.email,
      address: user.address,
    });
  }

  async checkout(id: string, user: any) {
    if (!Types.ObjectId.isValid(id)) {
      throw new InvalidObjectId(id);
    }

    const cart = await this.cartModel.findById(id);

    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    const cartObject = cart.toObject();

    const order = await this.orderModel.create(cartObject);

    const populatedOrder = await order.populate('products.product');

    await this.mailService.sendEmailWithTemplate(
      user.email,
      `Order has been placed`,
      'order',
      populatedOrder.toObject(),
    );

    await cart.remove();

    return order;
  }

  findAll() {
    return this.cartModel.find();
  }

  async findOne(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new InvalidObjectId(id);
    }

    const cart = await this.cartModel.findById(id);

    if (!cart) {
      throw new CartNotFoundException(id);
    }
  }

  update(id: string, updateCartDto: UpdateCartDto) {
    if (!Types.ObjectId.isValid(id)) {
      throw new InvalidObjectId(id);
    }
    return this.cartModel.findByIdAndUpdate(id, updateCartDto);
  }

  remove(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new InvalidObjectId(id);
    }
    return this.cartModel.findByIdAndDelete(id);
  }
}
