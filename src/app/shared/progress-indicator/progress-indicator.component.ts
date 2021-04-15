import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'bp-progress-indicator',
  templateUrl: './progress-indicator.component.html',
  styleUrls: ['./progress-indicator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgressIndicatorComponent implements OnChanges {
  @Input() progress: number;

  private strokeLength = 295.3;

  progressStyle = '';

  ngOnChanges(): void {
    this.progressStyle = this.getProgressStyle(this.progress, this.strokeLength)
  }

  private getProgressStyle(progress: number, strokeLength: number): string {
    const timeDone = (strokeLength / 100) * progress;

    return `stroke-dasharray:${timeDone} ${strokeLength};`;
  }

}
