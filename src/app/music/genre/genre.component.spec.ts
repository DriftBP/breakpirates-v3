import { waitForAsync } from '@angular/core/testing';
import { Shallow } from 'shallow-render';

import { GenreComponent } from './genre.component';
import { MusicModule } from './../music.module';
import { RouterModule, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

const routes: Routes = [];

describe('GenreComponent', () => {
  let shallow: Shallow<GenreComponent>;

  beforeEach(waitForAsync(() => {
    shallow = new Shallow(GenreComponent, MusicModule)
      .replaceModule(RouterModule, RouterTestingModule.withRoutes(routes));
  }));

  it('should create', async () => {
    const { element } = await shallow.render();

    expect(element.nativeElement).toBeTruthy();
  });
});
