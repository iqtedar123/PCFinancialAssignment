import { BadRequestException } from '@nestjs/common';
import { Product } from './entities/product.entity';
import { ProductsController } from './products.controller';
import * as ProductsService from './products.service';

const product: Product = {
  name: 'product',
  productId: 'product-id',
  price: 10,
};

let createSpy, findAllSpy, deleteSpy, upsertSpy;

describe('ProductsController', () => {
  let controller: ProductsController;
  let productsService: ProductsService.ProductsService;
  beforeEach(async () => {
    productsService = new ProductsService.ProductsService();
    controller = new ProductsController(productsService);
    createSpy = jest.spyOn(productsService, 'create');
    findAllSpy = jest.spyOn(productsService, 'findAll');
    deleteSpy = jest.spyOn(productsService, 'delete');
    upsertSpy = jest.spyOn(productsService, 'upsert');
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('calls create with provided product', async () => {
      await controller.create(product);
      expect(createSpy).toHaveBeenCalledWith(product);
    });
  });

  describe('findAll', () => {
    it('calls findAll with provided products', async () => {
      controller.findAll({ productIds: [product.productId] });
      expect(findAllSpy).toHaveBeenCalledWith([product.productId]);
    });
    it('handles error when input is invalid', async () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore deliberate invalid data
      await expect(controller.findAll({})).rejects.toThrow(BadRequestException);
    });
  });

  describe('delete', () => {
    it('calls delete with provided products', async () => {
      controller.delete({ productIds: [product.productId] });
      expect(deleteSpy).toHaveBeenCalledWith([product.productId]);
    });
    it('handles error when input is invalid', async () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore deliberate invalid data
      await expect(controller.delete({})).rejects.toThrow(BadRequestException);
    });
  });

  describe('upsert', () => {
    it('calls upsert with provided products', async () => {
      controller.upsert([product]);
      expect(upsertSpy).toHaveBeenCalledWith([product]);
    });
  });
});
