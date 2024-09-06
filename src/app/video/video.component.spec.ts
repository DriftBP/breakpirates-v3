import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { VideoComponent } from './video.component';

const routes: Routes = [];

describe('VideoComponent', () => {
  let component: VideoComponent;
  let fixture: ComponentFixture<VideoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        VideoComponent,
        TranslateModule.forRoot()
      ]
    });
    fixture = TestBed.createComponent(VideoComponent);
    component = fixture.componentInstance;
  }));

  it('should create', async () => {
    expect(component).toBeDefined();
  });
});
