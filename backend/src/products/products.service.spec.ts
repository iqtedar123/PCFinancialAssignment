import { Test, TestingModule } from '@nestjs/testing';
import { Product } from './entities/product.entity';
import { ProductsService } from './products.service';
import * as StorageService from '../storageService';
import { DATA_PATH, PRODUCT_FILENAME } from '../app.service';

const product: Product = {
  name: 'product',
  productId: 'product-id',
  price: 10,
};

const secondaryProduct: Product = {
  name: 'secondary product',
  productId: 'product-id2',
  price: 20,
};

const tertiaryProduct: Product = {
  name: 'tertiary product',
  productId: 'product-id3',
  price: 1,
};

const getFileSpy = jest.spyOn(StorageService, 'getFile');
const updateOrCreateFileSpy = jest.spyOn(StorageService, 'createOrUpdateFile');

beforeAll(() => {
  getFileSpy.mockResolvedValue('{}');
  updateOrCreateFileSpy.mockResolvedValue();
});

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsService],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('creates a new product', async () => {
      await service.create(product);
      expect(getFileSpy).toHaveBeenCalledWith(
        `${DATA_PATH}/${PRODUCT_FILENAME}`,
      );
      expect(updateOrCreateFileSpy).toHaveBeenCalledWith(
        DATA_PATH,
        PRODUCT_FILENAME,
        JSON.stringify({ products: [product] }),
      );
    });
    it('creates a new product and adds it to existing products', async () => {
      getFileSpy.mockResolvedValue(JSON.stringify({ products: [product] }));
      await service.create(secondaryProduct);
      expect(getFileSpy).toHaveBeenCalledWith(
        `${DATA_PATH}/${PRODUCT_FILENAME}`,
      );
      expect(updateOrCreateFileSpy).toHaveBeenCalledWith(
        DATA_PATH,
        PRODUCT_FILENAME,
        JSON.stringify({ products: [product, secondaryProduct] }),
      );
    });
  });

  describe('findAll', () => {
    it.each([
      ['no products exist', [], [product.productId], []],
      ['no products exist and productIds is empty', [], [], []],
      ['no products exist and productIds is undefined', [], undefined, []],
      [
        'products exist and productIds is correct',
        [product],
        [product.productId],
        [product],
      ],
      ['products exist and productIds is empty', [product], [], []],
      [
        'products exist and there is no match',
        [product],
        [secondaryProduct.productId],
        [],
      ],
      [
        'products exist and there are multiple product ids',
        [product],
        [product.productId, secondaryProduct.productId],
        [product],
      ],
      [
        'products exist and there are deleted products',
        [product, { ...secondaryProduct, isDeleted: true }],
        [product.productId, secondaryProduct.productId],
        [product],
      ],
    ])(
      'finds all products when %s',
      async (_, productsInFile, productIds, expected) => {
        getFileSpy.mockResolvedValue(
          JSON.stringify({ products: productsInFile }),
        );
        const result = await service.search(productIds);
        expect(result).toEqual(expected);
        expect(getFileSpy).toHaveBeenCalledWith(
          `${DATA_PATH}/${PRODUCT_FILENAME}`,
        );
        expect(updateOrCreateFileSpy).not.toHaveBeenCalled();
      },
    );
  });

  describe('upsert', () => {
    it.each([
      [
        'inserts products if there are no existing products',
        [],
        [product],
        [product],
      ],
      [
        'does nothing if there are no existing products and input is empty',
        [],
        [],
        [],
      ],
      [
        'inserts multiple products',
        [product],
        [secondaryProduct, tertiaryProduct],
        [product, secondaryProduct, tertiaryProduct],
      ],
      [
        'updates an existing product',
        [product],
        [
          {
            ...product,
            price: 15,
          },
        ],
        [
          {
            ...product,
            price: 15,
          },
        ],
      ],
      [
        'updates an existing product and inserts a new product',
        [product],
        [
          {
            ...product,
            price: 15,
          },
          secondaryProduct,
        ],
        [
          {
            ...product,
            price: 15,
          },
          secondaryProduct,
        ],
      ],
      [
        'un-deletes a product if it was already deleted',
        [
          {
            ...product,
            isDeleted: true,
          },
        ],
        [product],
        [
          {
            ...product,
            price: 10,
            isDeleted: false,
          },
        ],
      ],
    ])('%s', async (_, productsInFile, products, expected) => {
      getFileSpy.mockResolvedValue(
        JSON.stringify({ products: productsInFile }),
      );
      const result = await service.upsert(products);
      expect(result).toEqual(expected);
      expect(getFileSpy).toHaveBeenCalledWith(
        `${DATA_PATH}/${PRODUCT_FILENAME}`,
      );
      expect(updateOrCreateFileSpy).toHaveBeenCalledWith(
        DATA_PATH,
        PRODUCT_FILENAME,
        JSON.stringify({ products: expected }),
      );
    });
  });

  describe('delete', () => {
    it.each([
      [
        'products exist and productIds is correct',
        [product],
        [product.productId],
      ],
      [
        'products exist and there are multiple product ids',
        [product],
        [product.productId, secondaryProduct.productId],
      ],
    ])('deletes products when %s', async (_, productsInFile, productIds) => {
      const expected = [
        {
          ...product,
          isDeleted: true,
        },
      ];
      getFileSpy.mockResolvedValue(
        JSON.stringify({ products: productsInFile }),
      );
      const result = await service.delete(productIds);
      expect(result).toEqual(true);
      expect(getFileSpy).toHaveBeenCalledWith(
        `${DATA_PATH}/${PRODUCT_FILENAME}`,
      );
      expect(updateOrCreateFileSpy).toHaveBeenCalledWith(
        DATA_PATH,
        PRODUCT_FILENAME,
        JSON.stringify({ products: expected }),
      );
    });
  });

  it.each([
    ['no products exist', [], [product.productId], []],
    ['no products exist and productIds is empty', [], [], []],
    ['no products exist and productIds is undefined', [], undefined, []],
    ['products exist and productIds is empty', [product], [], [product]],
    [
      'products exist and there is no match',
      [product],
      [secondaryProduct.productId],
      [product],
    ],
  ])(
    'does not delete products when %s',
    async (_, productsInFile, productIds, expected) => {
      getFileSpy.mockResolvedValue(
        JSON.stringify({ products: productsInFile }),
      );
      const result = await service.delete(productIds);
      expect(result).toEqual(true);
      expect(getFileSpy).toHaveBeenCalledWith(
        `${DATA_PATH}/${PRODUCT_FILENAME}`,
      );
      if (!expected || expected.length === 0) {
        expect(updateOrCreateFileSpy).not.toHaveBeenCalled();
      }
    },
  );
});
