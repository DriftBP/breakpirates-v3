import { Component, EventEmitter, Output, input } from '@angular/core';
import { faRetweet } from '@fortawesome/free-solid-svg-icons';

import { SampleConfig } from '../sample-config';

@Component({
    selector: 'bp-sample-button',
    templateUrl: './sample-button.component.html',
    styleUrls: ['./sample-button.component.scss'],
    standalone: false
})
export class SampleButtonComponent {
  config = input.required<SampleConfig>();

  @Output() clicked = new EventEmitter<number>();

  faRetweet = faRetweet;

  onClick() {
    this.clicked.emit(this.config().id);
  }
}
