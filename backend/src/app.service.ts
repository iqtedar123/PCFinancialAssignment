import { Injectable, OnModuleInit } from '@nestjs/common';
import * as StorageService from './storageService';
import * as mockProducts from './data/mockProducts.json';

export const PRODUCT_FILENAME = 'products.json';
export const DATA_PATH = './data';

@Injectable()
export class AppService implements OnModuleInit {
  async onModuleInit() {
    try {
      await StorageService.createOrUpdateFile(
        DATA_PATH,
        PRODUCT_FILENAME,
        JSON.stringify(mockProducts),
      );
    } catch (e) {
      console.error('Error creating Products file', e);
    }
  }
  getHello(): string {
    return 'Hello World!';
  }
}
