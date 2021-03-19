import { ProductType } from '../models/product-type';

export const defaultProductType = ProductType.Turntable;

export const productTypes = [
  {
    id: ProductType.Turntable,
    name: 'SHOP.TURNTABLES'
  },
  {
    id: ProductType.Mixer,
    name: 'SHOP.MIXERS'
  },
  {
    id: ProductType.Headphones,
    name: 'SHOP.HEADPHONES'
  },
  {
    id: ProductType.CartStylus,
    name: 'SHOP.CART_STYLI'
  },
  {
    id: ProductType.Microphone,
    name: 'SHOP.MICROPHONES'
  },
  {
    id: ProductType.VinylCare,
    name: 'SHOP.VINYL_CARE'
  },
  {
    id: ProductType.Dvs,
    name: 'SHOP.DVS'
  },
  {
    id: ProductType.AudioInterface,
    name: 'SHOP.AUDIO_INTERFACES'
  }
];
