import { waitForAsync } from '@angular/core/testing';
import { RouterModule, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Shallow } from 'shallow-render/dist/lib/shallow';

import { MusicComponent } from './music.component';
import { MusicModule } from './music.module';

const routes: Routes = [];

describe('MusicComponent', () => {
  let shallow: Shallow<MusicComponent>;

  beforeEach(waitForAsync(() => {
    shallow = new Shallow(MusicComponent, MusicModule)
      .replaceModule(RouterModule, RouterTestingModule.withRoutes(routes));
  }));

  it('should create', async () => {
    const { element } = await shallow.render();

    expect(element.nativeElement).toBeTruthy();
  });
});
