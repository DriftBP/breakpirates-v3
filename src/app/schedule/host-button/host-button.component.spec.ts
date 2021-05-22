import { waitForAsync } from '@angular/core/testing';
import { Shallow } from 'shallow-render';

import { HostButtonComponent } from './host-button.component';
import { ScheduleModule } from '../schedule.module';

describe('HostButtonComponent', () => {
  let shallow: Shallow<HostButtonComponent>;

  beforeEach(waitForAsync(() => {
    shallow = new Shallow(HostButtonComponent, ScheduleModule);
  }));

  it('should create', async () => {
    const { element } = await shallow.render();

    expect(element.nativeElement).toBeTruthy();
  });
});
