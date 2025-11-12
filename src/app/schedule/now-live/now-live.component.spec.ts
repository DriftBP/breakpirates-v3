import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NowLiveComponent } from './now-live.component';
import { Show } from '../models/show';
import { mockShow } from '../../../test/data/mock.shows';
import { ScheduleService } from '../services/schedule.service';
import { MockScheduleService } from '../../../test/services/mock.schedule.service';
import { TranslateModule } from '@ngx-translate/core';

const mockShow2: Show = { ...mockShow, id: 2 };

describe('NowLiveComponent', () => {
  let component: NowLiveComponent;
  let fixture: ComponentFixture<NowLiveComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
        imports: [
          NowLiveComponent,
          TranslateModule.forRoot()
        ],
        providers: [
          {
            provide: ScheduleService,
            useClass: MockScheduleService
          }
        ]
    });
    fixture = TestBed.createComponent(NowLiveComponent);
    component = fixture.componentInstance;
  });

  it('should create', async () => {
    expect(component).toBeDefined();
  });

  it('should not indicate show is now playing', async () => {
    fixture.componentRef.setInput('show', mockShow);

    fixture.detectChanges();

    const nowPlaying = fixture.debugElement.query(By.css('.now-live'));

    expect(nowPlaying).toBeNull();
  });

  it('should indicate show is now playing', async () => {
    fixture.componentRef.setInput('show', mockShow2);

    fixture.detectChanges();

    const nowPlaying = fixture.debugElement.query(By.css('.now-live'));

    expect(nowPlaying).toBeDefined();
  });
});
