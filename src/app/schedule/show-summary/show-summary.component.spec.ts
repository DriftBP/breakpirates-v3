import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { ShowSummaryComponent } from './show-summary.component';
import { DayService } from '../services/day.service';
import { MockDayService } from '../../../test/services/mock.day.service';
import { MockShowService } from '../../../test/services/mock.show.service';
import { ShowService } from '../services/show.service';
import { MockTimePipe } from '../../../test/pipes/mock.time.pipe';
import { mockShow } from '../../../test/data/mock.shows';

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
          RouterModule.forRoot([
            { path: 'schedule/:id', component: DummyComponent }
          ])
        ],
        providers: [
          {
            provide: DayService,
            useClass: MockDayService
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
