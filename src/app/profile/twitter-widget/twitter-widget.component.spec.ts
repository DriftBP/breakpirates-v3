import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TwitterWidgetComponent } from './twitter-widget.component';

describe('TwitterWidgetComponent', () => {
  let component: TwitterWidgetComponent;
  let fixture: ComponentFixture<TwitterWidgetComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
        imports: [ TwitterWidgetComponent ]
    });
    fixture = TestBed.createComponent(TwitterWidgetComponent);
    component = fixture.componentInstance;
  }));

  it('should create', async () => {
    expect(component).toBeDefined();
  });
});
