import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodaysScheduleComponent } from './todays-schedule.component';
import { ScheduleService } from '../../schedule/services/schedule.service';
import { MockScheduleService } from '../../../test/services/mock.schedule.service';
import { NowPlayingService } from '../../shared/services/now-playing/now-playing.service';
import { NewsService } from '../../news/services/news.service';
import { MockNewsService } from '../../../test/services/mock.news.service';
import { activatedRouteTestingProvider, translateTestingImports, translateTestingProviders } from '../../../test/providers';
import { MockNowPlayingService } from '../../../test/services/mock.now-playing.service';

describe('TodaysScheduleComponent', () => {
  let component: TodaysScheduleComponent;
  let fixture: ComponentFixture<TodaysScheduleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TodaysScheduleComponent,
        ...translateTestingImports
      ],
      providers: [
        ...translateTestingProviders,
        {
          provide: ScheduleService,
          useClass: MockScheduleService
        },
        {
          provide: NowPlayingService,
          useClass: MockNowPlayingService
        },
        {
          provide: NewsService,
          useClass: MockNewsService
        },
        activatedRouteTestingProvider
      ]
    });
    fixture = TestBed.createComponent(TodaysScheduleComponent);
    component = fixture.componentInstance;
  });

  it('should create', async () => {
    expect(component).toBeDefined();
  });
});

