import { waitForAsync } from '@angular/core/testing';
import { RouterModule, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Shallow } from 'shallow-render/dist/lib/shallow';

import { DayScheduleComponent } from './day-schedule.component';
import { ScheduleModule } from '../schedule.module';

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
