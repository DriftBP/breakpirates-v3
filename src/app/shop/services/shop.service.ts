import { Injectable } from '@angular/core';

import { Product } from './product';
import { ProductType } from './product-type';
import { products } from './products';

@Injectable()
export class ShopService {
  private allProducts = products;

  getProductsByType(type: ProductType): Product[] {
    return this.allProducts.filter(product => product.Type === type);
  }
}
