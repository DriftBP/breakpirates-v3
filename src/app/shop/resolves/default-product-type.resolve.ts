import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { ShopResolvesModule } from './shop-resolves.module';
import { Product } from '../models/product';
import { ShopService } from '../services/shop.service';
import { ProductType } from '../models/product-type';

@Injectable({
  providedIn: ShopResolvesModule
})
export class DefaultProductTypeResolve implements Resolve<Product[]> {

  constructor(private shopService: ShopService) {}

  resolve() {
    const type = ProductType.Turntable;

    return this.shopService.getProductsByType(type);
  }
}
