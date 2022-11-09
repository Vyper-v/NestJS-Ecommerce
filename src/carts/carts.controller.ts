import { CreateItemDTO } from './dto/create-item.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  Logger,
} from '@nestjs/common';
import { ApiBearerAuth, ApiCookieAuth, ApiTags } from '@nestjs/swagger';
import { CartsService } from './carts.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { AuthenticatedGuard } from 'src/auth/guards/authenticated.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/enums/roles.enum';
import { UsersService } from 'src/users/users.service';

@ApiBearerAuth()
@ApiCookieAuth()
@ApiTags('Carts')
@Controller('carts')
@UseGuards(JwtAuthGuard, AuthenticatedGuard, RolesGuard)
@Roles(Role.User, Role.Admin)
export class CartsController {
  constructor(
    private readonly cartsService: CartsService,
    private readonly usersService: UsersService,
  ) {}

  @Post()
  async create(@Body() createItemDto: CreateItemDTO[], @Req() req: any) {
    const user = await this.usersService.findOne(req.user.id);

    return this.cartsService.create({
      email: user.email,
      products: createItemDto,
      address: user.address,
    });
  }

  @Get()
  findAll() {
    return this.cartsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    return this.cartsService.update(id, updateCartDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartsService.remove(id);
  }
}
