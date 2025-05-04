import { ChangeDetectionStrategy, Component, Signal, computed, input } from '@angular/core';

@Component({
    selector: 'bp-progress-indicator',
    templateUrl: './progress-indicator.component.html',
    styleUrls: ['./progress-indicator.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class ProgressIndicatorComponent {
  progress = input.required<number>();

  private strokeLength = 295.3;

  progressStyle: Signal<string>;

  constructor() {
    this.progressStyle = computed(() => {
      return this.getProgressStyle(this.progress(), this.strokeLength);
    });
  }

  private getProgressStyle(progress: number, strokeLength: number): string {
    const timeDone = (strokeLength / 100) * progress;

    return `stroke-dasharray:${timeDone} ${strokeLength};`;
  }

}
