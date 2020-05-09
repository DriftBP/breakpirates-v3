import { async } from '@angular/core/testing';
import { Shallow } from 'shallow-render';
import { RouterModule, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { VideoDetailsComponent } from './video-details.component';
import { VideoModule } from '../video.module';

const routes: Routes = [];

describe('VideoDetailsComponent', () => {
  let shallow: Shallow<VideoDetailsComponent>;

  beforeEach(async(() => {
    shallow = new Shallow(VideoDetailsComponent, VideoModule)
      .replaceModule(RouterModule, RouterTestingModule.withRoutes(routes));
  }));

  it('should create', async () => {
    const { element } = await shallow.render();

    expect(element.nativeElement).toBeTruthy();
  });
});
