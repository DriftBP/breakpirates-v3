import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MixcloudWidgetComponent } from './mixcloud-widget.component';

describe('MixcloudWidgetComponent', () => {
  let component: MixcloudWidgetComponent;
  let fixture: ComponentFixture<MixcloudWidgetComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ MixcloudWidgetComponent ]
    });
    fixture = TestBed.createComponent(MixcloudWidgetComponent);
    component = fixture.componentInstance;
  }));

  it('should create', async () => {
    expect(component).toBeDefined();
  });
});
