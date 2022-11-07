import { MulterModule } from '@nestjs/platform-express';
import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './schemas/product.schema';
import { createStorage } from 'src/auth/multer/storage';
import { imageFilter } from 'src/auth/multer/imageFilter';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
    MulterModule.register({
      storage: createStorage('products'),
      fileFilter: imageFilter,
    }),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
