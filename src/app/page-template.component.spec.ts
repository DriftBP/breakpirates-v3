import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

import { PageTemplateComponent } from './page-template.component';
import { ScheduleService } from './schedule/services/schedule.service';
import { MockScheduleService } from '../test/services/mock.schedule.service';
import { MockTranslateService } from '../test/services/mock.translate.service';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const global: any;

describe('PageTemplateComponent', () => {
  let component: PageTemplateComponent;
  let fixture: ComponentFixture<PageTemplateComponent>;

  beforeAll(() => {
    global.gtag = global.gtag || function() { return; };
  });

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        PageTemplateComponent,
        TranslatePipe
      ],
      providers: [
        {
          provide: TranslateService,
          useClass: MockTranslateService
        },
        {
          provide: ScheduleService,
          useClass: MockScheduleService
        },
        {
          provide: ActivatedRoute,
          useValue: {}
        },
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    fixture = TestBed.createComponent(PageTemplateComponent);
    component = fixture.componentInstance;
  });

  it('should create', async () => {
    expect(component).toBeDefined();
  });
});
