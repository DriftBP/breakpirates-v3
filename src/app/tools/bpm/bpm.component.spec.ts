import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { DateTime } from 'luxon';

import BpmComponent from './bpm.component';
import { DataCollectionStatus } from './data-collection-status';
import { DataPoint } from './data-point';

const maxDataPoints = 20;
const emptyDataPoints: DataPoint[] = [];
const insufficientDataPoints = new Array(maxDataPoints - 1).fill({
  time: DateTime.local()
}, 0, maxDataPoints);
const fullDataPoints = new Array(maxDataPoints).fill({
  time: DateTime.local()
}, 0, maxDataPoints);

describe('BpmComponent', () => {
  let component: BpmComponent;
  let fixture: ComponentFixture<BpmComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
        imports: [
          BpmComponent,
          TranslateModule.forRoot()
        ]
    });
    fixture = TestBed.createComponent(BpmComponent);
    component = fixture.componentInstance;
  });

  it('should create', async () => {
    expect(component).toBeDefined();
  });

  it('should recognise no data points', async () => {
    const result = component['isEmpty'](emptyDataPoints);

    expect(result).toBeTruthy();
  });

  it('should recognise required number of data points', async () => {
    const result = component['isFull'](fullDataPoints);

    expect(result).toBeTruthy();
  });

  it('should return relevant status', async () => {
    const emptyStatus = component['getStatus'](emptyDataPoints);
    const insufficientStatus = component['getStatus'](insufficientDataPoints);
    const fullStatus = component['getStatus'](fullDataPoints);

    expect(emptyStatus).toEqual(DataCollectionStatus.Empty);
    expect(insufficientStatus).toEqual(DataCollectionStatus.Insufficient);
    expect(fullStatus).toEqual(DataCollectionStatus.Full);
  });
});
