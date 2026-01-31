import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { ShowSummaryComponent } from './show-summary.component';
import { DayService } from '../services/day.service';
import { MockDayService } from '../../../test/services/mock.day.service';
import { MockShowService } from '../../../test/services/mock.show.service';
import { ShowService } from '../services/show.service';
import { mockShow } from '../../../test/data/mock.shows';
import { MockScheduleService } from '../../../test/services/mock.schedule.service';
import { ScheduleService } from '../services/schedule.service';

describe('ShowSummaryComponent', () => {
  let component: ShowSummaryComponent;
  let fixture: ComponentFixture<ShowSummaryComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        ShowSummaryComponent,
        TranslateModule.forRoot()
      ],
      providers: [
        {
          provide: DayService,
          useClass: MockDayService
        },
        {
          provide: ShowService,
          useClass: MockShowService
        },
        {
          provide: ScheduleService,
          useClass: MockScheduleService
        },
        {
          provide: ActivatedRoute,
          useValue: {}
        }
      ]
    });
    fixture = TestBed.createComponent(ShowSummaryComponent);
    component = fixture.componentInstance;
  });

  it('should create', async () => {
    expect(component).toBeDefined();
  });

  it('should not display day of week by default', async () => {
    fixture.componentRef.setInput('show', mockShow);

    fixture.detectChanges();

    const day = fixture.debugElement.query(By.css('.show-summary__day'));

    expect(day).toBeNull();
  });

  it('should display day of week', async () => {
    fixture.componentRef.setInput('show', mockShow);
    fixture.componentRef.setInput('displayDay', true);

    fixture.detectChanges();

    const day = fixture.debugElement.query(By.css('.show-summary__day'));

    expect(day).toBeDefined();
  });
});
