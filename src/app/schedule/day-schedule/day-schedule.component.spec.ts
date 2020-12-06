import { waitForAsync } from '@angular/core/testing';
import { Shallow } from 'shallow-render';

import { DayScheduleComponent } from './day-schedule.component';
import { ScheduleModule } from '../schedule.module';
import { RouterModule, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

const routes: Routes = [];

describe('DayScheduleComponent', () => {
  let shallow: Shallow<DayScheduleComponent>;

  beforeEach(waitForAsync(() => {
    shallow = new Shallow(DayScheduleComponent, ScheduleModule)
      .replaceModule(RouterModule, RouterTestingModule.withRoutes(routes));
  }));

  it('should create', async () => {
    const { element } = await shallow.render();

    expect(element.nativeElement).toBeTruthy();
  });
});
