import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { DaySelectComponent } from './day-select.component';
import { Day } from '../models/day';

const mockDay: Day = {
  id: 1,
  name: 'Monday'
};

describe('DaySelectComponent', () => {
  let component: DaySelectComponent;
  let fixture: ComponentFixture<DaySelectComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        DaySelectComponent
      ]
    });
    fixture = TestBed.createComponent(DaySelectComponent);
    component = fixture.componentInstance;
  }));

  it('should create', async () => {
    expect(component).toBeDefined();
  });

  it('should list days of the week', async () => {
    fixture.componentRef.setInput('days', [ mockDay ]);
    fixture.componentRef.setInput('activeDayId', 1);

    fixture.detectChanges();

    const days = fixture.debugElement.queryAll(By.css('.nav-link'));

    expect(days.length).toBeGreaterThan(0);
  });
});
