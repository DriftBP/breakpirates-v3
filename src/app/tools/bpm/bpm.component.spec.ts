import { waitForAsync } from '@angular/core/testing';
import { Shallow } from 'shallow-render';
import moment from 'moment';

import { BpmComponent } from './bpm.component';
import { ToolsModule } from '../tools.module';
import { DataCollectionStatus } from './data-collection-status';

const maxDataPoints = 20;
const emptyDataPoints = [];
const insufficientDataPoints = new Array(maxDataPoints - 1).fill({
  time: moment()
}, 0, maxDataPoints);
const fullDataPoints = new Array(maxDataPoints).fill({
  time: moment()
}, 0, maxDataPoints);

describe('BpmComponent', () => {
  let shallow: Shallow<BpmComponent>;

  beforeEach(waitForAsync(() => {
    shallow = new Shallow(BpmComponent, ToolsModule);
  }));

  it('should create', async () => {
    const { element } = await shallow.render();

    expect(element.nativeElement).toBeTruthy();
  });

  it('should recognise no data points', async () => {
    const { instance } = await shallow.render();

    const result = instance['isEmpty'](emptyDataPoints);

    expect(result).toBeTruthy();
  });

  it('should recognise required number of data points', async () => {
    const { instance } = await shallow.render();

    const result = instance['isFull'](fullDataPoints);

    expect(result).toBeTruthy();
  });

  it('should return relevant status', async () => {
    const { instance } = await shallow.render();

    const emptyStatus = instance['getStatus'](emptyDataPoints);
    const insufficientStatus = instance['getStatus'](insufficientDataPoints);
    const fullStatus = instance['getStatus'](fullDataPoints);

    expect(emptyStatus).toEqual(DataCollectionStatus.Empty);
    expect(insufficientStatus).toEqual(DataCollectionStatus.Insufficient);
    expect(fullStatus).toEqual(DataCollectionStatus.Full);
  });
});
