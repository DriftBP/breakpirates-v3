import { async } from '@angular/core/testing';
import { Shallow } from 'shallow-render';

import { ShowSummaryComponent } from './show-summary.component';
import { ScheduleModule } from '../schedule.module';

describe('ShowSummaryComponent', () => {
  let shallow: Shallow<ShowSummaryComponent>;

  beforeEach(async(() => {
    shallow = new Shallow(ShowSummaryComponent, ScheduleModule);
  }));

  it('should create', async () => {
    const { element } = await shallow.render();

    expect(element.nativeElement).toBeTruthy();
  });
});
