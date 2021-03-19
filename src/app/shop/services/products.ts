import { ProductType } from '../models/product-type';

type ProductList<T extends number, V> = {
  [K in T]: V;
}

export const products: ProductList<ProductType, string[]> = {
  [ProductType.Headphones]: [
    'B01CRI3UOU', // Sennheiser HD25
    'B0069JFBM8'  // Sennheiser HD25 earpads
  ],
  [ProductType.Turntable]: [
    'B076S9VFKV'  // Reloop RP7000 MK2
  ],
  [ProductType.Mixer]: [
    'B00W3T3TOK', // Reloop RMX22i
    'B074L92B6W'  // Pioneer DJM750 MK2
  ],
  [ProductType.CartStylus]: [
    'B000ML4KT4', // Ortofon Concorde Pro S
    'B00GPHDH6G'  // Reloop Concorde Black
  ],
  [ProductType.Microphone]: [],
  [ProductType.Dvs]: [
    'B00CIVSQJ6'  // Serato timecode vinyl
  ],
  [ProductType.VinylCare]: [
    'B01AKAHF52', // Velvet Vinyl Cleaning Brush by SPINCARE
    'B000BFXIVW'  // DISCO-ANTISTAT
  ],
  [ProductType.AudioInterface]: [
    'B002GHBYZ0', // Behringer UFO202
    'B0023BYDHK'  // Behringer U-Control UCA222
  ],
};
