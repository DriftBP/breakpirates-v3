import { Component, HostListener } from '@angular/core';
import moment from 'moment';

import { BreadcrumbConfigItem } from '../../shared/breadcrumb/breadcrumb-config-item';
import { toolsConfigInactive } from '../../shared/breadcrumb/breadcrumb-config';
import { DataCollectionStatus } from './data-collection-status';

class DataPoint {
  time: moment.Moment;
}

@Component({
  selector: 'bp-bpm',
  templateUrl: './bpm.component.html'
})
export class BpmComponent {
  private maxDataPoints = 20;

  message: DataCollectionStatus;
  statuses = DataCollectionStatus;
  bpm: number;
  beatBuffer: DataPoint[];
  breadcrumbConfig: BreadcrumbConfigItem[] = [
    toolsConfigInactive,
    {
      name: 'BPM_COUNTER.TITLE',
      isActive: true
    }
  ];

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    switch (event.key) {
      case 'Enter':
        this.onClick();
        event.preventDefault();
        break;
    }
  }

  constructor() {
    this.reset();
  }

  private reset(): void {
    this.beatBuffer = [];
    this.message = this.getStatus(this.beatBuffer);
  }

  private isEmpty(dataPoints: DataPoint[]): boolean {
    return dataPoints.length === 0;
  }

  private isFull(dataPoints: DataPoint[]): boolean {
    return dataPoints.length >= this.maxDataPoints;
  }

  private getStatus(dataPoints: DataPoint[]): DataCollectionStatus {
    if (this.isEmpty(dataPoints)) {
      return DataCollectionStatus.Empty;
    } else if (this.isFull(dataPoints)) {
      return DataCollectionStatus.Full;
    } else {
      return DataCollectionStatus.Insufficient;
    }
  }

  private calcBpm(dataPoints: DataPoint[]): number {
    const millisecondsInMinute = 60000;

    // Check we have enough data points
    if (this.isFull(dataPoints)) {
      const first = dataPoints.slice(0, 1).shift();
      const last = dataPoints.slice(dataPoints.length - 1, dataPoints.length).shift();

      // Difference in milliseconds
      const time = last.time.diff(first.time);

      const bpmUnrounded = (millisecondsInMinute / time) * (this.maxDataPoints - 1);

      return Math.round(bpmUnrounded * 10) / 10;
    }

    return 0;
  }

  private updateValues(): void {
    this.message = this.getStatus(this.beatBuffer);
    this.bpm = this.calcBpm(this.beatBuffer);
  }

  private addToBuffer(dataPoint: DataPoint): void {
    if (this.isFull(this.beatBuffer)) {
      this.beatBuffer.shift();
    }

    this.beatBuffer.push(dataPoint);

    // Update status
    this.updateValues();
  }

  onClick(): void {
    const dataPoint: DataPoint = {
      time: moment()
    };

    this.addToBuffer(dataPoint);
  }

  onReset(): void {
    this.reset();
  }

}
