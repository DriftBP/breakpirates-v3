import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { ScheduleService } from '../schedule/services/schedule.service';
import { MockScheduleService } from '../../test/services/mock.schedule.service';
import { NewsService } from '../news/services/news.service';
import { MockNewsService } from '../../test/services/mock.news.service';
import { activatedRouteTestingProvider, translateTestingImports, translateTestingProviders } from '../../test/providers';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HomeComponent,
        ...translateTestingImports
      ],
      providers: [
        ...translateTestingProviders,
        {
          provide: ScheduleService,
          useClass: MockScheduleService
        },
        {
          provide: NewsService,
          useClass: MockNewsService
        },
        activatedRouteTestingProvider
      ]
    });
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  it('should create', async () => {
    expect(component).toBeDefined();
  });
});

