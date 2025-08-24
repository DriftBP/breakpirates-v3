import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';

import { ScheduleComponent } from './schedule.component';
import { TranslateModule } from '@ngx-translate/core';
import { BreadcrumbService } from '../shared/services/breadcrumb/breadcrumb.service';
import { MockRouterService } from '../../test/services/mock.router.service';
import { MockBreadcrumbService } from '../../test/services/mock.breadcrumb.service';
import { DayService } from './services/day.service';
import { MockDayService } from '../../test/services/mock.day.service';

describe('ScheduleComponent', () => {
  let component: ScheduleComponent;
  let fixture: ComponentFixture<ScheduleComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
        imports: [
          ScheduleComponent,
          TranslateModule.forRoot(),
        ],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: {}
          },
          {
            provide: Router,
            useClass: MockRouterService
          },
          {
            provide: BreadcrumbService,
            useClass: MockBreadcrumbService
          },
          {
            provide: DayService,
            useClass: MockDayService
          }
        ]
    });
    fixture = TestBed.createComponent(ScheduleComponent);
    component = fixture.componentInstance;
  });

  it('should create', async () => {
    expect(component).toBeDefined();
  });
});
