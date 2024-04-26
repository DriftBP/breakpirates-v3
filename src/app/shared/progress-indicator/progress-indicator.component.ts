import { ChangeDetectionStrategy, Component, effect, input } from '@angular/core';

@Component({
  selector: 'bp-progress-indicator',
  templateUrl: './progress-indicator.component.html',
  styleUrls: ['./progress-indicator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgressIndicatorComponent {
  progress = input.required<number>();

  private strokeLength = 295.3;

  progressStyle = '';

  constructor() {
    effect(() => {
      this.progressStyle = this.getProgressStyle(this.progress(), this.strokeLength);
    });
  }

  private getProgressStyle(progress: number, strokeLength: number): string {
    const timeDone = (strokeLength / 100) * progress;

    return `stroke-dasharray:${timeDone} ${strokeLength};`;
  }

}
