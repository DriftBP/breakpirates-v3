import { waitForAsync } from '@angular/core/testing';
import { Shallow } from 'shallow-render';
import { Routes, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { ScheduleComponent } from './schedule.component';
import { ScheduleModule } from './schedule.module';
import { Show } from './models/show';

const routes: Routes = [];

const mockShow: Show = {
  id: 1,
  title: 'title',
  start_time: '00:00',
  end_time: '01:00',
  day_id: 1,
  description: 'descripion',
  genres: [],
  hosts: []
};

describe('ScheduleComponent', () => {
  let shallow: Shallow<ScheduleComponent>;

  beforeEach(waitForAsync(() => {
    shallow = new Shallow(ScheduleComponent, ScheduleModule)
      .replaceModule(RouterModule, RouterTestingModule.withRoutes(routes));
  }));

  it('should create', async () => {
    const { element } = await shallow.render();

    expect(element.nativeElement).toBeTruthy();
  });
});
