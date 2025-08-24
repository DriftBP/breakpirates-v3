import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
    selector: 'bp-content-box',
    templateUrl: './content-box.component.html',
    styleUrls: ['./content-box.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentBoxComponent {
  title = input.required<string>();
}
