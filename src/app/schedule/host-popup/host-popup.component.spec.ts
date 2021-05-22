import { waitForAsync } from '@angular/core/testing';
import { Shallow } from 'shallow-render';

import { HostPopupComponent } from './host-popup.component';
import { ScheduleModule } from '../schedule.module';

describe('HostPopupComponent', () => {
  let shallow: Shallow<HostPopupComponent>;

  beforeEach(waitForAsync(() => {
    shallow = new Shallow(HostPopupComponent, ScheduleModule);
  }));

  it('should create', async () => {
    const { element } = await shallow.render();

    expect(element.nativeElement).toBeTruthy();
  });
});
