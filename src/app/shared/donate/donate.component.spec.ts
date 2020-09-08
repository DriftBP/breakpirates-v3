import { waitForAsync } from '@angular/core/testing';
import { Shallow } from 'shallow-render';

import { DonateComponent } from './donate.component';
import { SharedModule } from '../shared.module';

describe('DonateComponent', () => {
  let shallow: Shallow<DonateComponent>;

  beforeEach(waitForAsync(() => {
    shallow = new Shallow(DonateComponent, SharedModule);
  }));

  it('should create', async () => {
    const { element } = await shallow.render();

    expect(element.nativeElement).toBeTruthy();
  });
});
