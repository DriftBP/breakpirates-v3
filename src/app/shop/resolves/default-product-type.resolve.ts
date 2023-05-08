import { Injectable } from '@angular/core';


import { ShopResolvesModule } from './shop-resolves.module';
import { ShopService } from '../services/shop.service';
import { defaultProductType } from '../services/product-types';

@Injectable({
  providedIn: ShopResolvesModule
})
export class DefaultProductTypeResolve  {

  constructor(private shopService: ShopService) {}

  resolve() {
    const type = defaultProductType;

    return this.shopService.getProductsByType(type);
  }
}
