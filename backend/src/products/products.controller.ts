import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Header,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { ProductIdsDto } from './dto/productIdsDto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductDto } from './dto/productDto';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiOperation({
    summary: 'Create a new product',
  })
  @Post()
  async create(@Body() product: Product) {
    return this.productsService.create(product);
  }

  @ApiResponse({
    status: 200,
    description: 'Found products successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request Body',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Service Error',
  })
  @ApiOperation({
    summary: 'Find all matching products',
  })
  @Get()
  @Header('Content-Type', 'application/json')
  async findAll(@Body() body: ProductIdsDto) {
    if (!body?.productIds) {
      throw new BadRequestException('Invalid body');
    }
    try {
      return this.productsService.findAll(body?.productIds);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  @ApiResponse({
    status: 200,
    description: 'Deleted item',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request Body',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Service Error',
  })
  @ApiOperation({
    summary: 'For each product virtualy delete the item',
  })
  @Delete()
  @Header('Content-Type', 'application/json')
  async delete(@Body() body: ProductIdsDto) {
    if (!body?.productIds) {
      throw new BadRequestException();
    }
    try {
      return this.productsService.delete(body?.productIds);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  @ApiResponse({
    status: 200,
    description: 'Inserted/Updated successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request Body',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Service Error',
  })
  @ApiOperation({
    summary:
      'For each product if it exists updates the value and if it doesnt exist inserts the product',
  })
  @Post('/upsert')
  @Header('Content-Type', 'application/json')
  async upsert(@Body() products: ProductDto[]) {
    try {
      return this.productsService.upsert(products);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
