import { waitForAsync } from '@angular/core/testing';
import { Shallow } from 'shallow-render';

import { AdUnitComponent } from './ad-unit.component';
import { SharedModule } from '../shared.module';

describe('AdUnitComponent', () => {
  let shallow: Shallow<AdUnitComponent>;

  beforeEach(waitForAsync(() => {
    shallow = new Shallow(AdUnitComponent, SharedModule);
  }));

  it('should create', async () => {
    const { element } = await shallow.render();

    expect(element.nativeElement).toBeTruthy();
  });
});
