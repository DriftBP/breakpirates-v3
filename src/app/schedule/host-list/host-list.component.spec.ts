import { waitForAsync } from '@angular/core/testing';
import { Shallow } from 'shallow-render';

import { HostListComponent } from './host-list.component';
import { ScheduleModule } from '../schedule.module';

describe('HostListComponent', () => {
  let shallow: Shallow<HostListComponent>;

  beforeEach(waitForAsync(() => {
    shallow = new Shallow(HostListComponent, ScheduleModule);
  }));

  it('should create', async () => {
    const { element } = await shallow.render();

    expect(element.nativeElement).toBeTruthy();
  });
});
