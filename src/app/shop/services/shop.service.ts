import { Injectable } from '@angular/core';

import { Product } from './product';
import { ProductType } from './product-type';

@Injectable()
export class ShopService {
  private allProducts = [
    {
      Asin: 'B01CRI3UOU', // Sennheiser HD25
      Type: ProductType.Headphones
    },
    {
      Asin: 'B0069JFBM8', // Sennheiser HD25 earpads
      Type: ProductType.Headphones
    },
    {
      Asin: 'B076S9VFKV', // Reloop RP7000 MK2
      Type: ProductType.Turntable
    },
    {
      Asin: 'B00W3T3TOK', // Reloop RMX22i
      Type: ProductType.Mixer
    },
    {
      Asin: 'B074L92B6W', // Pioneer DJM750 MK2
      Type: ProductType.Mixer
    },
    {
      Asin: 'B000ML4KT4', // Ortofon Concorde Pro S
      Type: ProductType.CartStylus
    },
    {
      Asin: 'B00GPHDH6G', // Reloop Concorde Black
      Type: ProductType.CartStylus
    },
    {
      Asin: 'B00CIVSQJ6', // Serato timecode vinyl
      Type: ProductType.Dvs
    },
    {
      Asin: 'B01AKAHF52', // Velvet Vinyl Cleaning Brush by SPINCARE
      Type: ProductType.VinylCare
    },
    {
      Asin: 'B000BFXIVW', // DISCO-ANTISTAT
      Type: ProductType.VinylCare
    },
    {
      Asin: 'B002GHBYZ0', // Behringer UFO202
      Type: ProductType.AudioInterface
    },
    {
      Asin: 'B0023BYDHK', // Behringer U-Control UCA222
      Type: ProductType.AudioInterface
    }
  ];

  constructor() { }

  getProducts(): Product[] {
    return this.allProducts;
  }

  getProductsByType(type: ProductType): Product[] {
    return this.allProducts.filter(product => product.Type === type);
  }
}
