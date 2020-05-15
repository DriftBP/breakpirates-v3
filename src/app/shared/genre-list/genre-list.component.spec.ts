import { async } from '@angular/core/testing';
import { Shallow } from 'shallow-render';

import { GenreListComponent } from './genre-list.component';
import { SharedModule } from '../shared.module';

describe('GenreListComponent', () => {
  let shallow: Shallow<GenreListComponent>;

  beforeEach(async(() => {
    shallow = new Shallow(GenreListComponent, SharedModule);
  }));

  it('should create', async () => {
    const { element } = await shallow.render();

    expect(element.nativeElement).toBeTruthy();
  });
});
