import { Component } from '@angular/core';

import { AppSettings } from '../../app-settings';

@Component({
  selector: 'app-radio-player',
  templateUrl: './radio-player.component.html',
  styleUrls: ['./radio-player.component.scss']
})
export class RadioPlayerComponent {
  tuneInUrl: string;

  constructor() {
    this.tuneInUrl = AppSettings.TUNE_IN_URL_PRIMARY;
  }

}
