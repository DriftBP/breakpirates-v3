import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';

import { ShowSummaryComponent } from './show-summary.component';
import { Show } from '../models/show';
import { DayService } from '../services/day.service';
import { MockDayService } from '../../../test/services/mock.day.service';
import { MockScheduleService } from '../../../test/services/mock.schedule.service';
import { ScheduleService } from '../services/schedule.service';
import { MockShowService } from '../../../test/services/mock.show.service';
import { ShowService } from '../services/show.service';
import { MockTimePipe } from '../../../test/pipes/mock.time.pipe';

const mockShow1: Show = {
  id: 1,
  title: 'title',
  start_time: '00:00:00',
  end_time: '00:00:00',
  day_id: 1,
  genres: [],
  hosts: []
};
const mockShow2: Show = { ...mockShow1, id: 2 };

@Component({
  template: ''
})
class DummyComponent {
}

describe('ShowSummaryComponent', () => {
  let component: ShowSummaryComponent;
  let fixture: ComponentFixture<ShowSummaryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
        declarations: [
          ShowSummaryComponent,
          MockTimePipe
        ],
        imports: [
          TranslateModule.forRoot(),
          RouterTestingModule.withRoutes([
            { path: 'schedule/:id', component: DummyComponent }
           ])
        ],
        providers: [
          {
            provide: DayService,
            useClass: MockDayService
          },
          {
            provide: ScheduleService,
            useClass: MockScheduleService
          },
          {
            provide: ShowService,
            useClass: MockShowService
          }
        ]
    });
    fixture = TestBed.createComponent(ShowSummaryComponent);
    component = fixture.componentInstance;
  }));

  it('should create', async () => {
    expect(component).toBeDefined();
  });

  it('should not display day of week by default', async () => {
    component.show = mockShow1;

    fixture.detectChanges();

    const day = fixture.debugElement.query(By.css('.show-summary__day'));

    expect(day).toBeNull();
  });

  it('should display day of week', async () => {
    component.show = mockShow1;
    component.displayDay = true;

    fixture.detectChanges();

    const day = fixture.debugElement.query(By.css('.show-summary__day'));

    expect(day).toBeDefined();
  });

  it('should not indicate show is now playing', async () => {
    component.show = mockShow1;

    fixture.detectChanges();

    const nowPlaying = fixture.debugElement.query(By.css('.show-summary__now-live'));

    expect(nowPlaying).toBeNull();
  });

  it('should indicate show is now playing', async () => {
    component.show = mockShow2;

    fixture.detectChanges();

    const nowPlaying = fixture.debugElement.query(By.css('.show-summary__now-live'));

    expect(nowPlaying).toBeDefined();
  });
});
