import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { ShopResolvesModule } from './shop-resolves.module';
import { Product } from '../models/product';
import { ShopService } from '../services/shop.service';
import { defaultProductType } from '../services/product-types';

@Injectable({
  providedIn: ShopResolvesModule
})
export class DefaultProductTypeResolve implements Resolve<Product[]> {

  constructor(private shopService: ShopService) {}

  resolve() {
    const type = defaultProductType;

    return this.shopService.getProductsByType(type);
  }
}
