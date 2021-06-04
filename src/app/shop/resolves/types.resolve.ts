import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { ProductTypeModel } from '../models/product-type-model';
import { ShopResolvesModule } from './shop-resolves.module';
import { ShopService } from '../services/shop.service';

@Injectable({
  providedIn: ShopResolvesModule
})
export class TypesResolve implements Resolve<ProductTypeModel[]> {

  constructor(private shopService: ShopService) {}

  resolve() {
    return this.shopService.getProductTypes();
  }
}
