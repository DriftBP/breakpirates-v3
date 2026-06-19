import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { HomeComponent } from './home.component';
import { ScheduleService } from '../schedule/services/schedule.service';
import { MockScheduleService } from '../../test/services/mock.schedule.service';
import { NewsService } from '../news/services/news.service';
import { MockNewsService } from '../../test/services/mock.news.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        HomeComponent,
        TranslateModule.forRoot(),
      ],
      providers: [
        {
          provide: ScheduleService,
          useClass: MockScheduleService
        },
        {
          provide: NewsService,
          useClass: MockNewsService
        },
        {
          provide: ActivatedRoute,
          useValue: {}
        }
      ]
    });
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  it('should create', async () => {
    expect(component).toBeDefined();
  });
});

