import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RadioPlayerComponent } from './radio-player.component';

describe('RadioPlayerComponent', () => {
  let component: RadioPlayerComponent;
  let fixture: ComponentFixture<RadioPlayerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
        imports: [
          RadioPlayerComponent
        ]
    });
    fixture = TestBed.createComponent(RadioPlayerComponent);
    component = fixture.componentInstance;
  }));

  it('should create', async () => {
    expect(component).toBeDefined();
  });
});
