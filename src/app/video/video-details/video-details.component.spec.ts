import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VideoDetailsComponent } from './video-details.component';

describe('VideoDetailsComponent', () => {
  let component: VideoDetailsComponent;
  let fixture: ComponentFixture<VideoDetailsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        VideoDetailsComponent
      ]
    });
    fixture = TestBed.createComponent(VideoDetailsComponent);
    component = fixture.componentInstance;
  }));

  it('should create', async () => {
    expect(component).toBeDefined();
  });
});
