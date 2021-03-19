import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { ShopResolvesModule } from './shop-resolves.module';
import { Product } from '../services/product';
import { ShopService } from '../services/shop.service';

@Injectable({
  providedIn: ShopResolvesModule
})
export class ProductTypeResolve implements Resolve<Product[]> {

  constructor(private shopService: ShopService) {}

  resolve(route: ActivatedRouteSnapshot) {
    const type = parseInt(route.paramMap.get('type'), 10);

    return this.shopService.getProductsByType(type);
  }
}
