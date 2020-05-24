import { async } from '@angular/core/testing';
import { Shallow } from 'shallow-render';

import { BreadcrumbComponent } from './breadcrumb.component';
import { SharedModule } from '../shared.module';
import { BreadcrumbConfigItem } from './breadcrumb-config-item';
import { homeConfigInactive, scheduleConfigActive } from './breadcrumb-config';

const mockConfig: BreadcrumbConfigItem[] = [
  homeConfigInactive,
  scheduleConfigActive
];

describe('BreadcrumbComponent', () => {
  let shallow: Shallow<BreadcrumbComponent>;

  beforeEach(async(() => {
    shallow = new Shallow(BreadcrumbComponent, SharedModule);
  }));

  it('should create', async () => {
    const { element } = await shallow.render();

    expect(element.nativeElement).toBeTruthy();
  });

  it('should find the active breadcrumb item', async () => {
    const { instance } = await shallow.render();

    const activeItem = instance['getActiveItem'](mockConfig);

    expect(activeItem.isActive).toBeTruthy();
  });
});
