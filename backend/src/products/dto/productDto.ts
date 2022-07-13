import { ApiProperty } from '@nestjs/swagger';

export class ProductDto {
  @ApiProperty({
    description: 'The name of a product',
    minimum: 0,
    default: 0,
  })
  name: string;

  @ApiProperty({
    description: 'The id of a product',
    minimum: 1,
    default: 1,
  })
  productId: string;

  @ApiProperty({
    description: 'The price of a product',
    minimum: 0,
    default: 0,
  })
  price: number;
}
