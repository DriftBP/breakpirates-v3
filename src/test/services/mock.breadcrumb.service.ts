import { Injectable, signal } from '@angular/core';

import { BreadcrumbConfigItem } from '../../app/shared/breadcrumb/breadcrumb-config-item';
import { homeConfigInactive, scheduleConfigActive } from '../../app/shared/breadcrumb/breadcrumb-config';

export const mockHomeConfig: BreadcrumbConfigItem[] = [];

export const mockScheduleConfig: BreadcrumbConfigItem[] = [
  homeConfigInactive,
  scheduleConfigActive
];

@Injectable()
export class MockBreadcrumbService {
  get breadcrumb() {
    return signal([mockScheduleConfig]);
  }

  setBreadcrumb(): void {}
}
