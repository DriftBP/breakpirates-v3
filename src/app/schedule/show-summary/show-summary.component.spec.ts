import { async } from '@angular/core/testing';
import { Shallow } from 'shallow-render';

import { ShowSummaryComponent } from './show-summary.component';
import { ScheduleModule } from '../schedule.module';
import { RouterModule, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

const routes: Routes = [];

describe('ShowSummaryComponent', () => {
  let shallow: Shallow<ShowSummaryComponent>;

  beforeEach(async(() => {
    shallow = new Shallow(ShowSummaryComponent, ScheduleModule)
      .replaceModule(RouterModule, RouterTestingModule.withRoutes(routes));
  }));

  it('should create', async () => {
    const { element } = await shallow.render();

    expect(element.nativeElement).toBeTruthy();
  });
});
