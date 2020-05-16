import { Component } from '@angular/core';

import { AppSettings } from '../../app-settings';

@Component({
  selector: 'app-radio-player',
  templateUrl: './radio-player.component.html',
  styleUrls: ['./radio-player.component.scss']
})
export class RadioPlayerComponent {
  tuneInUrl = AppSettings.STREAM_URL_PRIMARY;
}
