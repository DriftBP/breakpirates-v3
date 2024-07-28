import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';

import { DayScheduleComponent } from './day-schedule.component';

describe('DayScheduleComponent', () => {
  let component: DayScheduleComponent;
  let fixture: ComponentFixture<DayScheduleComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
        imports: [
          DayScheduleComponent,
          TranslateModule.forRoot(),
        ],
        providers: [
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
  }));

  it('should create', async () => {
    expect(component).toBeDefined();
  });
});
