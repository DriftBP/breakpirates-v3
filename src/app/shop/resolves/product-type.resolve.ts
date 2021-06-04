import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { ShopResolvesModule } from './shop-resolves.module';
import { ShopService } from '../services/shop.service';

@Injectable({
  providedIn: ShopResolvesModule
})
export class ProductTypeResolve implements Resolve<string[]> {

  constructor(private shopService: ShopService) {}

  resolve(route: ActivatedRouteSnapshot) {
    const type = parseInt(route.paramMap.get('type'), 10);

    return this.shopService.getProductsByType(type);
  }
}
