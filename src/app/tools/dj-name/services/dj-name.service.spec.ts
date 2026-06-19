import { TestBed } from '@angular/core/testing';

import { DjNameService } from './dj-name.service';
import { animals } from './animals';
import { shapes } from './shapes';

describe('DjNameService', () => {
  let service: DjNameService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DjNameService]
    });

    service = TestBed.inject(DjNameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getRandomNumber', () => {
    it('should return the same number if min and max are identical', () => {
      const value = 50;
      const result = service['getRandomNumber'](value, value);

      expect(result).toEqual(value);
    });

    it('should generate a number within the given range', () => {
      const min = 0;
      const max = 100;
      const result = service['getRandomNumber'](min, max);

      expect(result).toBeGreaterThanOrEqual(min);
      expect(result).toBeLessThanOrEqual(max);
    });
  });

  describe('getNumber', () => {
    it('should return a value between 11 and 99 inclusive', () => {
      const result = service.getNumber();

      expect(result).toBeGreaterThanOrEqual(11);
      expect(result).toBeLessThanOrEqual(99);
    });
  });

  describe('getAnimal', () => {
    it('should return a value from the animals list', () => {
      const animalList = animals;
      const result = service.getAnimal();

      expect(animalList).toContain(result);
    });
  });

  describe('getShape', () => {
    it('should return a value from the shapes list', () => {
      const shapeList = shapes;
      const result = service.getShape();

      expect(shapeList).toContain(result);
    });
  });
});
