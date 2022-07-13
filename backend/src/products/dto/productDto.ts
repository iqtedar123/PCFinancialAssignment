import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class ProductDto {
  @ApiProperty({
    description: 'The name of a product',
    minimum: 0,
    default: 0,
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The id of a product',
    minimum: 1,
    default: 1,
  })
  @IsString()
  productId: string;

  @ApiProperty({
    description: 'The price of a product',
    minimum: 0,
    default: 0,
  })
  @IsInt()
  price: number;
}
