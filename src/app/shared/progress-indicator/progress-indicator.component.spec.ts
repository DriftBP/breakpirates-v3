import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProgressIndicatorComponent } from './progress-indicator.component';

describe('ProgressIndicatorComponent', () => {
  let component: ProgressIndicatorComponent;
  let fixture: ComponentFixture<ProgressIndicatorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        ProgressIndicatorComponent
      ]
    });
    fixture = TestBed.createComponent(ProgressIndicatorComponent);
    component = fixture.componentInstance;
  }));

  it('should create', async () => {
    expect(component).toBeDefined();
  });
});
