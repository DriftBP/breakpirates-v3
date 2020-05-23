import { Component, HostListener } from '@angular/core';
import moment from 'moment';

enum DataCollectionStatus {
  Empty,
  Insufficient,
  Full
}

class DataPoint {
  time: moment.Moment;
}

@Component({
  selector: 'app-bpm',
  templateUrl: './bpm.component.html',
  styleUrls: ['./bpm.component.scss']
})
export class BpmComponent {
  private maxDataPoints = 20;
  private millisecondsInMinute = 60000;

  message: DataCollectionStatus;
  statuses = DataCollectionStatus;
  bpm: number;
  beatBuffer: DataPoint[];

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

  private reset() {
    this.beatBuffer = [];
    this.setMessage();
  }

  private isBufferEmpty(): boolean {
    return this.beatBuffer.length === 0;
  }

  private isBufferFull(): boolean {
    return this.beatBuffer.length === this.maxDataPoints;
  }

  private setMessage(): void {
    if (this.isBufferEmpty()) {
      this.message = DataCollectionStatus.Empty;
    } else if (this.isBufferFull()) {
      this.message = DataCollectionStatus.Full;
    } else {
      this.message = DataCollectionStatus.Insufficient;
    }
  }

  private calcBpm(): void {
    // Check we have enough data points
    if (this.isBufferFull()) {
      const first = this.beatBuffer.slice(0, 1).shift();
      const last = this.beatBuffer.slice(this.beatBuffer.length - 1, this.beatBuffer.length).shift();

      // Difference in milliseconds
      const time = last.time.diff(first.time);

      const bpmUnrounded = (this.millisecondsInMinute / time) * (this.maxDataPoints - 1);

      this.bpm = Math.round(bpmUnrounded * 10) / 10;
    }
  }

  private updateValues(): void {
    this.setMessage();
    this.calcBpm();
  }

  private addToBuffer(dataPoint: DataPoint) {
    if (this.beatBuffer.length >= this.maxDataPoints) {
      this.beatBuffer.shift();
    }

    this.beatBuffer.push(dataPoint);

    // Update status
    this.updateValues();
  }

  onClick() {
    const dataPoint: DataPoint = {
      time: moment()
    };

    this.addToBuffer(dataPoint)
  }

  onReset() {
    this.reset();
  }

}
