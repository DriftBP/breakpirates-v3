import { waitForAsync } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { Shallow } from 'shallow-render';

import { BreadcrumbComponent } from './breadcrumb.component';
import { SharedModule } from '../shared.module';
import { BreadcrumbConfigItem } from './breadcrumb-config-item';
import { homeConfigInactive, scheduleConfigActive } from './breadcrumb-config';
import { BreadcrumbService } from '../services/breadcrumb/breadcrumb.service';

const mockHomeConfig: BreadcrumbConfigItem[] = [
  homeConfigInactive
];

const mockScheduleConfig: BreadcrumbConfigItem[] = [
  homeConfigInactive,
  scheduleConfigActive
];

const mockBreadcrumbService = {
  breadcrumb: of( mockScheduleConfig )
};

const mockTranslateService = {
  get: jest.fn()
};

describe('BreadcrumbComponent', () => {
  let shallow: Shallow<BreadcrumbComponent>;

  beforeEach(waitForAsync(() => {
    shallow = new Shallow(BreadcrumbComponent, SharedModule)
      .mock(BreadcrumbService, mockBreadcrumbService)
      .mock(TranslateService, mockTranslateService);
  }));

  it('should create', async () => {
    const { element } = await shallow.render();

    expect(element.nativeElement).toBeTruthy();
  });

  it('should detect home', async () => {
    const { instance } = await shallow.render();

    const isHome = instance['isHome'](mockHomeConfig);

    expect(isHome).toBeTruthy();
  });

  it('should detect not home', async () => {
    const { instance } = await shallow.render();

    const isHome = instance['isHome'](mockScheduleConfig);

    expect(isHome).toBeFalsy();
  });

  it('should find the active breadcrumb item', async () => {
    const { instance } = await shallow.render();

    const activeItem = instance['getActiveItem'](mockScheduleConfig);

    expect(activeItem.isActive).toBeTruthy();
  });
});
