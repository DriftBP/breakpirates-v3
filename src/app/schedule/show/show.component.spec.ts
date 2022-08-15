import { waitForAsync } from '@angular/core/testing';
import { Shallow } from 'shallow-render';
import { RouterModule, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { ShowComponent } from './show.component';
import { ScheduleModule } from '../schedule.module';

const routes: Routes = [];

describe('ShowComponent', () => {
  let shallow: Shallow<ShowComponent>;

  beforeEach(waitForAsync(() => {
    shallow = new Shallow(ShowComponent, ScheduleModule)
      .replaceModule(RouterModule, RouterTestingModule.withRoutes(routes));
  }));

  it('should create', async () => {
    const { element } = await shallow.render();

    expect(element.nativeElement).toBeTruthy();
  });
});
