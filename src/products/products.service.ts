import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductDocument } from './schemas/product.schema';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') private productModel: Model<ProductDocument>,
  ) {}

  create(createProductDto: CreateProductDto) {
    return this.productModel.create(createProductDto);
  }

  findAll(filter: FilterQuery<ProductDocument> = {}) {
    return this.productModel.find(filter);
  }

  findOne(id: string) {
    return this.productModel.findById(id);
  }

  findCategory(category: string) {
    return this.productModel.find({ category });
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    return this.productModel.findByIdAndUpdate(id, updateProductDto);
  }

  updateImage(id: string, image: string) {
    return this.productModel.findByIdAndUpdate(id, { image });
  }

  remove(id: string) {
    return this.productModel.findByIdAndDelete(id);
  }
}
