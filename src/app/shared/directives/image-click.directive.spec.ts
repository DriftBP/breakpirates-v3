import { TestBed } from '@angular/core/testing';

import { ImageClickDirective } from './image-click.directive';

describe('ImageClickDirective', () => {
  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ImageClickDirective]
    }).compileComponents();
  });

  it('should create an instance', () => {
    const directive = new ImageClickDirective();
    expect(directive).toBeTruthy();
  });
});
