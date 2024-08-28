import { Injectable } from '@angular/core';

import { animals } from './animals';
import { shapes } from './shapes';

@Injectable()
export class DjNameService {
  private getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min);
  }

  getAnimal(): string {
    const index = this.getRandomNumber(0, animals.length);

    return animals[index];
  }

  getNumber(): number {
    const min = 11;
    const max = 99;

    return this.getRandomNumber(min, max);
  }

  getShape(): string {
    const index = this.getRandomNumber(0, shapes.length);

    return shapes[index];
  }
}
