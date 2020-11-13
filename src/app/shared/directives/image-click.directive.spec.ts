import { ElementRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { DialogService } from '../services/dialog/dialog.service';
import { ImageClickDirective } from './image-click.directive';

class MockDialogService extends DialogService {}

class MockElementRef extends ElementRef {
  constructor() { super(null); }
}

describe('ImageClickDirective', () => {
  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ImageClickDirective],
      providers: [
        { provide: DialogService, useClass: MockDialogService },
        { provide: ElementRef, useClass: MockElementRef }
      ]
    }).compileComponents();
  });

  it('should create an instance', () => {
    const directive = new ImageClickDirective(new MockDialogService(), new MockElementRef());
    expect(directive).toBeTruthy();
  });
});
