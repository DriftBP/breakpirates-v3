import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleButtonComponent } from './sample-button.component';

describe('SampleButtonComponent', () => {
  let component: SampleButtonComponent;
  let fixture: ComponentFixture<SampleButtonComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        SampleButtonComponent
      ]
    });
    fixture = TestBed.createComponent(SampleButtonComponent);
    component = fixture.componentInstance;
  });

  it('should create', async () => {
    expect(component).toBeDefined();
  });
});
