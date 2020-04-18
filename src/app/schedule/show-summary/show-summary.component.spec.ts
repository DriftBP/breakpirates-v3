import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

import { ShowSummaryComponent } from './show-summary.component';
import { ScheduleService } from '../schedule.service';

describe('ShowSummaryComponent', () => {
  let component: ShowSummaryComponent;
  let fixture: ComponentFixture<ShowSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ShowSummaryComponent,
      ],
      providers: [
        ScheduleService
      ],
      imports: [
        RouterTestingModule,
        HttpClientModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
