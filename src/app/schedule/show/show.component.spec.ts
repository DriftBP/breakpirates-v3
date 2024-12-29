import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { ShowComponent } from './show.component';
import { ShowService } from '../services/show.service';
import { MockShowService } from '../../../test/services/mock.show.service';
import { DayService } from '../services/day.service';
import { MockDayService } from '../../../test/services/mock.day.service';
import { BreadcrumbService } from '../../shared/services/breadcrumb/breadcrumb.service';
import { MockBreadcrumbService } from '../../../test/services/mock.breadcrumb.service';
import { mockShow } from '../../../test/data/mock.shows';
import { Show } from '../models/show';
import { ScheduleService } from '../services/schedule.service';
import { MockScheduleService } from '../../../test/services/mock.schedule.service';

const mockShowWithDescriptionAndImage: Show = {
  ...mockShow,
  description: 'description',
  image: 'image.jpg'
};

describe('ShowComponent', () => {
  let component: ShowComponent;
  let fixture: ComponentFixture<ShowComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
        imports: [
          ShowComponent,
          TranslateModule.forRoot(),
        ],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: {}
          },
          {
            provide: DayService,
            useClass: MockDayService
          },
          {
            provide: ShowService,
            useClass: MockShowService
          },
          {
            provide: BreadcrumbService,
            useClass: MockBreadcrumbService
          },
          {
            provide: ScheduleService,
            useClass: MockScheduleService
          }
        ]
    });
    fixture = TestBed.createComponent(ShowComponent);
    component = fixture.componentInstance;
  }));

  it('should create', async () => {
    expect(component).toBeDefined();
  });

  describe('Show images', () => {
    it('should not display an image if the show doesn`t have one defined', async () => {
      fixture.componentRef.setInput('show', mockShow);

      fixture.detectChanges();

      const image = fixture.debugElement.query(By.css('.show__image'));

      expect(image).toBeNull();
    });

    it('should display an image if the show has one and a description defined', async () => {
      fixture.componentRef.setInput('show', mockShowWithDescriptionAndImage);

      fixture.detectChanges();

      const image: HTMLImageElement = fixture.debugElement.query(By.css('.show__image')).nativeElement;

      expect(image).toBeDefined();
      expect(image.src).toBeDefined();
    });
  });
});
