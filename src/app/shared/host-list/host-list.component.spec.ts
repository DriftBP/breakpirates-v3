import { waitForAsync } from '@angular/core/testing';
import { Shallow } from 'shallow-render';

import { HostListComponent } from './host-list.component';
import { SharedModule } from '../shared.module';

describe('HostListComponent', () => {
  let shallow: Shallow<HostListComponent>;

  beforeEach(waitForAsync(() => {
    shallow = new Shallow(HostListComponent, SharedModule);
  }));

  it('should create', async () => {
    const { element } = await shallow.render();

    expect(element.nativeElement).toBeTruthy();
  });
});
