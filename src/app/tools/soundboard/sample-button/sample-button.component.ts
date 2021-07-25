import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faRetweet } from '@fortawesome/free-solid-svg-icons';

import { SampleConfig } from '../sample-config';

@Component({
  selector: 'bp-sample-button',
  templateUrl: './sample-button.component.html'
})
export class SampleButtonComponent {
  @Input() config: SampleConfig;

  @Output() clicked = new EventEmitter<number>();

  faRetweet = faRetweet;

  onClick() {
    this.clicked.emit(this.config.id);
  }
}
