import { Injectable } from '@angular/core';

import { Product } from './product';
import { ProductType } from './product-type';
import { ProductTypeModel } from './product-type-model';
import { products } from './products';

@Injectable()
export class ShopService {
  private allProducts = products;

  getProductTypes(): ProductTypeModel[] {
    return [
      {
        id: ProductType.Turntable,
        name: "SHOP.TURNTABLES"
      },
      {
        id: ProductType.Mixer,
        name: "SHOP.MIXERS"
      },
      {
        id: ProductType.Headphones,
        name: "SHOP.HEADPHONES"
      },
      {
        id: ProductType.CartStylus,
        name: "SHOP.CART_STYLI"
      },
      {
        id: ProductType.Microphone,
        name: "SHOP.MICROPHONES"
      },
      {
        id: ProductType.VinylCare,
        name: "SHOP.VINYL_CARE"
      },
      {
        id: ProductType.Dvs,
        name: "SHOP.DVS"
      },
      {
        id: ProductType.AudioInterface,
        name: "SHOP.AUDIO_INTERFACES"
      }
    ];
  }

  getProductsByType(type: ProductType): Product[] {
    return this.allProducts.filter(product => product.type === type);
  }
}
