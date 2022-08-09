import { waitForAsync } from '@angular/core/testing';
import { Shallow } from 'shallow-render/dist/lib/shallow';

import { GenreListComponent } from './genre-list.component';
import { ScheduleModule } from '../schedule.module';

describe('GenreListComponent', () => {
  let shallow: Shallow<GenreListComponent>;

  beforeEach(waitForAsync(() => {
    shallow = new Shallow(GenreListComponent, ScheduleModule);
  }));

  it('should create', async () => {
    const { element } = await shallow.render();

    expect(element.nativeElement).toBeTruthy();
  });
});
