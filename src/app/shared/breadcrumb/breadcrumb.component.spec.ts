import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';

import { BreadcrumbComponent } from './breadcrumb.component';
import { mockHomeConfig, mockScheduleConfig } from '../../../test/services/mock.breadcrumb.service';

describe('BreadcrumbComponent', () => {
  let component: BreadcrumbComponent;
  let fixture: ComponentFixture<BreadcrumbComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        BreadcrumbComponent,
        TranslateModule.forRoot(),
      ]
    });
    fixture = TestBed.createComponent(BreadcrumbComponent);
    component = fixture.componentInstance;
  });

  it('should create', async () => {
    expect(component).toBeDefined();
  });

  it('should detect home', async () => {
    const isHome = component['isHome'](mockHomeConfig);

    expect(isHome).toBeTruthy();
  });

  it('should detect not home', async () => {
    const isHome = component['isHome'](mockScheduleConfig);

    expect(isHome).toBeFalsy();
  });

  it('should find the active breadcrumb item', async () => {
    const activeItem = component['getActiveItem'](mockScheduleConfig);

    expect(activeItem?.isActive).toBeTruthy();
  });
});
