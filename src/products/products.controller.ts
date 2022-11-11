import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Logger,
  Put,
  UseFilters,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiCookieAuth } from '@nestjs/swagger';
import { AuthenticatedGuard } from 'src/auth/guards/authenticated.guard';
import { JwtAuthGuard } from './../auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/enums/roles.enum';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductExceptionFilter } from './filters/ProductException.filter';

// El usuario debe estar autenticado por jwt y session, y debe tener minimo el rol de usuario para acceder a los endpoints get.
@ApiTags('Products')
@ApiBearerAuth()
@ApiCookieAuth()
@Controller('products')
@UseFilters(ProductExceptionFilter)
@UseGuards(JwtAuthGuard, AuthenticatedGuard, RolesGuard)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @Roles(Role.Admin)
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @Roles(Role.User, Role.Admin)
  findAll() {
    return this.productsService.findAll({
      stock: { $gt: 0 },
    });
  }

  @Get(':id')
  @Roles(Role.User, Role.Admin)
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Get('category/:category')
  @Roles(Role.User, Role.Admin)
  findCategory(@Param('category') category: string) {
    return this.productsService.findCategory(category);
  }

  @Patch(':id/image')
  @Roles(Role.User, Role.Admin)
  @UseInterceptors(FileInterceptor('image'))
  updateImage(
    @Param('id') id: string,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.productsService.updateImage(id, image.originalname);
  }

  @Put(':id')
  @Roles(Role.Admin)
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
