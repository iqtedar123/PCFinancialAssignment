import { Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class ProductsValidationPipe {
  schema: any;
  constructor(schema) {
    this.schema = schema;
  }

  transform(value) {
    // Check to see if its an array first
    if (Array.isArray(value) && value.length > 0) {
      for (let i = 0; i < value.length; i++) {
        const { error } = this.schema.validate(value[i]);
        if (error) {
          throw new BadRequestException('Validation failed');
        }
      }
      return value;
    } else {
      throw new BadRequestException(
        'Validation failed. Expected an array of products.',
      );
    }
  }
}
