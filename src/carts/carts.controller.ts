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
  UseFilters,
  ParseArrayPipe,
} from '@nestjs/common';
import { AuthenticatedGuard } from 'src/auth/guards/authenticated.guard';
import { ApiBearerAuth, ApiCookieAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { UsersService } from 'src/users/users.service';
import { Role } from 'src/enums/roles.enum';
import { CartsService } from './carts.service';
import { UpdateCartDto } from './dto/update-cart.dto';
import { CreateItemDTO } from './dto/create-item.dto';
import { CartExceptionFilter } from './filters/CartException.filter';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@ApiBearerAuth()
@ApiCookieAuth()
@ApiTags('Carts')
@Controller('carts')
@UseFilters(CartExceptionFilter)
@UseGuards(JwtAuthGuard, AuthenticatedGuard, RolesGuard)
@Roles(Role.User, Role.Admin)
export class CartsController {
  constructor(
    private readonly cartsService: CartsService,
    private readonly usersService: UsersService,
  ) {}

  @Post()
  async create(
    @Body(new ParseArrayPipe({ items: CreateItemDTO }))
    createItemDto: CreateItemDTO[],
    @Req() req: any,
  ) {
    const user = await this.usersService.findByEmail(req.user.email);

    return this.cartsService.create(createItemDto, user.toObject());
  }

  @Post('checkout/:id')
  async checkout(@Param('id') id: string, @Req() req: any) {
    const user = await this.usersService.findByEmail(req.user.email);

    return this.cartsService.checkout(id, user.toObject());
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
