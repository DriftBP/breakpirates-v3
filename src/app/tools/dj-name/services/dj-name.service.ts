import { Injectable } from '@angular/core';

import { animals } from './animals';
import { shapes } from './shapes';

@Injectable()
export class DjNameService {
  getRandomAnimal(): string {
    return animals[Math.floor(Math.random() * animals.length)];
  }

  getRandomNumber(): number {
    const min = 11;
    const max = 99;

    return Math.floor(Math.random() * (max - min) + min);
  }

  getRandomShape(): string {
    return shapes[Math.floor(Math.random() * shapes.length)];
  }
}
