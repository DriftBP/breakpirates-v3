import { Component, Input } from '@angular/core';

import { Host } from '../host';
import { AppSettings } from '../../app-settings';

@Component({
  selector: 'app-profile-button',
  templateUrl: './profile-button.component.html',
  styleUrls: ['./profile-button.component.scss']
})
export class ProfileButtonComponent {
  @Input() host: Host;

  imagePath = AppSettings.ASSET_PROFILE_IMAGE;
}
