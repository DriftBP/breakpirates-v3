import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';

import { HomeComponent } from './home.component';
import { ScheduleService } from '../schedule/services/schedule.service';
import { MockScheduleService } from '../../test/services/mock.schedule.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
        imports: [
          HomeComponent,
          TranslateModule.forRoot(),
        ],
        providers: [
          {
            provide: ScheduleService,
            useClass: MockScheduleService
          }
        ]
    });
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  }));

  it('should create', async () => {
    expect(component).toBeDefined();
  });
});

