import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Header,
  InternalServerErrorException,
  ParseArrayPipe,
  UsePipes,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductDto } from './dto/productDto';
import { JoiValidationPipe } from '../pipes/joiValidation.pipe';
import { productSchema } from './schema/product.schema';
import { ProductsValidationPipe } from '../pipes/productsValidation.pipe';
import { Transform } from 'class-transformer';
import { IsArray, IsString } from 'class-validator';

export class IdFilter {
  @IsArray()
  @IsString({ each: true })
  @Transform(({ value }) => value.split('&'))
  productIds?: string[];
}

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiOperation({
    summary: 'Create a new product',
  })
  @Post()
  @UsePipes(new JoiValidationPipe(productSchema))
  async create(@Body() product: Product) {
    try {
      return this.productsService.create(product);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
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
  @Get('/search')
  @Header('Content-Type', 'application/json')
  async search(
    @Query(new ValidationPipe({ transform: true })) productIds: IdFilter,
  ) {
    try {
      return this.productsService.search(productIds.productIds);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
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
    summary: 'Find all products',
  })
  @Get('')
  @Header('Content-Type', 'application/json')
  async findAll() {
    try {
      return this.productsService.findAll();
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
  async delete(@Body('productIds', ParseArrayPipe) productIds: string[]) {
    try {
      return this.productsService.delete(productIds);
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
  @UsePipes(new ProductsValidationPipe(productSchema))
  async upsert(@Body() products: ProductDto[]) {
    try {
      return this.productsService.upsert(products);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
