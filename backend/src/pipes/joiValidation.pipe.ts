import { Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class JoiValidationPipe {
  schema: any;
  constructor(schema) {
    this.schema = schema;
  }

  transform(value) {
    const { error } = this.schema.validate(value);
    if (error) {
      throw new BadRequestException('Validation failed');
    }
    return value;
  }
}
