import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { AuthGuard } from '../guard/auth.guard';
import { RolesGuard } from '../guard/roles.guard';
import { Role } from '../auth/dto/role.enum'; 
import { Roles } from 'src/guard/roles.decorator';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN) 
  @Post()
  create(@Body() data) {
    return this.productService.create(data);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.USER, Role.ADMIN) 
  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.SUPER_ADMIN) 
  @Put(':id')
  update(@Param('id') id: string, @Body() data) {
    return this.productService.update(id, data);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN) 
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}
