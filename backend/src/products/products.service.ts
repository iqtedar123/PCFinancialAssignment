import { Injectable } from '@nestjs/common';
import { Product } from './entities/product.entity';
import * as StorageService from '../storageService';
import { DATA_PATH, PRODUCT_FILENAME } from '../app.service';

@Injectable()
export class ProductsService {
  async create(product: Product) {
    const products = await this.getData();
    // Add product to product list
    products.push(product);
    await this.updateStorage(products);
    return true;
  }

  async search(productIds: string[]) {
    const products = await this.getData();
    // Return non deleted products
    return products
      ? products?.filter(
          (product) =>
            !product.isDeleted && productIds.includes(product.productId),
        )
      : [];
  }

  async findAll() {
    const products = await this.getData();
    // Return non deleted products
    return products ? products?.filter((product) => !product.isDeleted) : [];
  }

  async upsert(products: Product[]) {
    const allProducts = await this.getData();
    // Update existing product, insert otherwise
    const newProducts = products.reduce((acc, product) => {
      const existingIndex = acc.findIndex(
        (p) => p.productId === product.productId,
      );

      if (existingIndex >= 0) {
        // Already exists, just update the product
        // Note: We can also use spread syntax to only overwrite the properties we receive from request instead of overwriting the entire object
        // Check if product was deleted
        acc[existingIndex] = {
          ...product,
          ...(acc[existingIndex]?.isDeleted ? { isDeleted: false } : {}),
        };
      } else {
        // New item
        acc = [...acc, product];
      }
      return acc;
    }, allProducts);

    await this.updateStorage(newProducts);

    return newProducts;
  }

  async delete(productIds: string[]) {
    const allProducts = await this.getData();
    if (allProducts.length === 0 || productIds.length === 0) {
      return true;
    }
    // Delete existing product
    const newProducts = allProducts.map((product) => ({
      ...product,
      ...(productIds.includes(product.productId) ? { isDeleted: true } : {}),
    }));

    await this.updateStorage(newProducts);

    return true;
  }

  async getData(): Promise<Product[] | undefined> {
    const data = await StorageService.getFile(
      `${DATA_PATH}/${PRODUCT_FILENAME}`,
    );
    const parsedData = typeof data === 'string' ? JSON.parse(data) : undefined;
    return parsedData ? parsedData?.products ?? [] : [];
  }

  async updateStorage(products: Product[]) {
    await StorageService.createOrUpdateFile(
      DATA_PATH,
      PRODUCT_FILENAME,
      JSON.stringify({ products }),
    );
  }
}
