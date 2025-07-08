import { ComponentFixture, TestBed } from '@angular/core/testing';

import Drum808Component from './808.component';

describe('Drum808Component', () => {
  let component: Drum808Component;
  let fixture: ComponentFixture<Drum808Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Drum808Component]
    }).compileComponents();
    fixture = TestBed.createComponent(Drum808Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
