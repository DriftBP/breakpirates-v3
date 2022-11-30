import { waitForAsync } from '@angular/core/testing';
import { ActivatedRoute, RouterModule, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Shallow } from 'shallow-render';
import { of } from 'rxjs';

import { DayScheduleComponent } from './day-schedule.component';
import { ScheduleModule } from '../schedule.module';

const routes: Routes = [];

describe('DayScheduleComponent', () => {
  let shallow: Shallow<DayScheduleComponent>;

  beforeEach(waitForAsync(() => {
    shallow = new Shallow(DayScheduleComponent, ScheduleModule)
      .replaceModule(RouterModule, RouterTestingModule.withRoutes(routes))
      .mock(ActivatedRoute, {
        paramMap: of(null),
        snapshot: {
          data: {
            'schedule': []
          }
        }
      });
  }));

  it('should create', async () => {
    const { element } = await shallow.render();

    expect(element.nativeElement).toBeTruthy();
  });
});
