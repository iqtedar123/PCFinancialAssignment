import * as Joi from 'joi';

export const productSchema = Joi.object({
  productId: Joi.string().alphanum().min(1).max(100).required(),

  productName: Joi.string().alphanum().min(1).max(100).required(),

  price: Joi.number().required(),
});
