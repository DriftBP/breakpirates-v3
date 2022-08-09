import { waitForAsync } from '@angular/core/testing';
import { Shallow } from 'shallow-render/dist/lib/shallow';
import { RouterModule, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { VideoComponent } from './video.component';
import { VideoModule } from './video.module';

const routes: Routes = [];

describe('VideoComponent', () => {
  let shallow: Shallow<VideoComponent>;

  beforeEach(waitForAsync(() => {
    shallow = new Shallow(VideoComponent, VideoModule)
      .replaceModule(RouterModule, RouterTestingModule.withRoutes(routes));
  }));

  it('should create', async () => {
    const { element } = await shallow.render();

    expect(element.nativeElement).toBeTruthy();
  });
});
