import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

import { ScheduleComponent } from './schedule.component';
import { ScheduleService } from './schedule.service';
import { MapToArrayPipe } from '../shared/pipes/map-to-array.pipe';
import { ShowSummaryComponent } from './show-summary/show-summary.component';

describe('ScheduleComponent', () => {
  let component: ScheduleComponent;
  let fixture: ComponentFixture<ScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [ScheduleService],
      declarations: [
        ScheduleComponent,
        MapToArrayPipe,
        ShowSummaryComponent
      ],
      imports: [
        HttpClientModule,
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
