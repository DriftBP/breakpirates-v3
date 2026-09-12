import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { MockTranslateService } from '../../../test/services/mock.translate.service';
import { of } from 'rxjs';

import { DayScheduleComponent } from './day-schedule.component';

describe('DayScheduleComponent', () => {
  let component: DayScheduleComponent;
  let fixture: ComponentFixture<DayScheduleComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
        imports: [
          DayScheduleComponent,
          TranslatePipe
        ],
        providers: [
          {
            provide: TranslateService,
            useClass: MockTranslateService
          },
          {
            provide: ActivatedRoute,
            useValue: {
              paramMap: of(null),
              snapshot: {
                data: {
                  'schedule': []
                }
              }
            }
          }
        ]
    });
    fixture = TestBed.createComponent(DayScheduleComponent);
    component = fixture.componentInstance;
  });

  it('should create', async () => {
    expect(component).toBeDefined();
  });
});
