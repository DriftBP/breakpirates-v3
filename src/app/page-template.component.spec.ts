import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { PageTemplateComponent } from './page-template.component';
import { ScheduleService } from './schedule/services/schedule.service';
import { MockScheduleService } from '../test/services/mock.schedule.service';

declare var global: any;

describe('PageTemplateComponent', () => {
  let component: PageTemplateComponent;
  let fixture: ComponentFixture<PageTemplateComponent>;

  beforeAll(() => {
    global.gtag = global.gtag || function() {};
  });

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        PageTemplateComponent,
        TranslateModule.forRoot(),
        BrowserAnimationsModule
      ],
      providers: [
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
    fixture = TestBed.createComponent(PageTemplateComponent);
    component = fixture.componentInstance;
  }));

  it('should create', async () => {
    expect(component).toBeDefined();
  });
});
