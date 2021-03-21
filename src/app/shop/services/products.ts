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
    'B076S9VFKV', // Reloop RP7000 MK2 (silver)
    'B076S7TKX3'  // Reloop RP7000 MK2 (black)
  ],
  [ProductType.Mixer]: [
    'B00W3T3TOK', // Reloop RMX22i
    'B074L92B6W', // Pioneer DJM750 MK2
    'B00L2GMJU0', // Allen & Heath Xone 23C
    'B06XCY7Q5H', // Pioneer DJM-250MK2
    'B009STRJOE', // Traktor Kontrol Z2
    'B01BCCYQVS'  // Pioneer DJM-900NXS2
  ],
  [ProductType.CartStylus]: [
    'B000ML4KT4', // Ortofon Concorde Pro S
    'B00GPHDH6G'  // Reloop Concorde Black
  ],
  [ProductType.Microphone]: [
    'B00TTQM94Q', // Shure PG
  ],
  [ProductType.DvsController]: [
    'B00CIVSQJ6', // Serato timecode vinyl
    'B07954L8TD'  // Pioneer Pro DJ Controller
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
