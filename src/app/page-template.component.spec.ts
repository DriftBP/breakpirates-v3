import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
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

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        PageTemplateComponent,
        TranslateModule.forRoot()
      ],
      providers: [
        {
          provide: ScheduleService,
          useClass: MockScheduleService
        },
        {
          provide: ActivatedRoute,
          useValue: {}
        },
        provideHttpClient(withInterceptorsFromDi())
      ]
    });
    fixture = TestBed.createComponent(PageTemplateComponent);
    component = fixture.componentInstance;
  });

  it('should create', async () => {
    expect(component).toBeDefined();
  });
});
