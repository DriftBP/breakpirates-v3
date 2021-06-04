import { Injectable } from '@angular/core';

import { ProductType } from '../models/product-type';
import { ProductTypeModel } from '../models/product-type-model';
import { productTypes } from './product-types';
import { products } from './products';

@Injectable()
export class ShopService {
  private allProducts = products;

  getProductTypes(): ProductTypeModel[] {
    return productTypes;
  }

  getProductsByType(type: ProductType): string[] {
    return this.allProducts[type];
  }
}
