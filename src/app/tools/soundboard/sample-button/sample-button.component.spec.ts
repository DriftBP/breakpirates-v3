import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SampleButtonComponent } from './sample-button.component';

describe('SampleButtonComponent', () => {
  let component: SampleButtonComponent;
  let fixture: ComponentFixture<SampleButtonComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
        imports: [
          SampleButtonComponent
        ]
    });
    fixture = TestBed.createComponent(SampleButtonComponent);
    component = fixture.componentInstance;
  }));

  it('should create', async () => {
    expect(component).toBeDefined();
  });
});
