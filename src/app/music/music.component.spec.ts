import { async } from '@angular/core/testing';
import { Shallow } from 'shallow-render';

import { MusicComponent } from './music.component';
import { MusicModule } from './music.module';
import { RouterModule, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

const routes: Routes = [];

describe('MusicComponent', () => {
  let shallow: Shallow<MusicComponent>;

  beforeEach(async(() => {
    shallow = new Shallow(MusicComponent, MusicModule)
      .replaceModule(RouterModule, RouterTestingModule.withRoutes(routes));
  }));

  it('should create', async () => {
    const { element } = await shallow.render();

    expect(element.nativeElement).toBeTruthy();
  });
});
