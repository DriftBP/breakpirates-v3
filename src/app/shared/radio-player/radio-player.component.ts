import { Component } from '@angular/core';
import { PlyrPlayerComponent } from '../../players/plyr-player/plyr-player.component';

import { AppSettings } from '../../app-settings';

@Component({
    selector: 'bp-radio-player',
    standalone: true,
    imports: [PlyrPlayerComponent],
    templateUrl: './radio-player.component.html',
    styleUrls: ['./radio-player.component.scss']
})
export class RadioPlayerComponent {
  tuneInUrl = `${AppSettings.STREAM_URL_PRIMARY}`;
}
