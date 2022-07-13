import { ApiProperty } from '@nestjs/swagger';

export class ProductIdsDto {
  @ApiProperty({
    description: 'The list of product ids',
    type: [String],
  })
  productIds: string[];
}
