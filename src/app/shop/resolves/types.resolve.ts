import { Injectable } from '@angular/core';


import { ProductTypeModel } from '../models/product-type-model';
import { ShopResolvesModule } from './shop-resolves.module';
import { ShopService } from '../services/shop.service';

@Injectable({
  providedIn: ShopResolvesModule
})
export class TypesResolve  {

  constructor(private shopService: ShopService) {}

  resolve() {
    return this.shopService.getProductTypes();
  }
}
