import { Component, Input } from '@angular/core';

import { Host } from '../../profile/host';
import { AppSettings } from '../../app-settings';

@Component({
  selector: 'bp-host-popup',
  templateUrl: './host-popup.component.html',
  styleUrls: ['./host-popup.component.scss']
})
export class HostPopupComponent {
  @Input() host: Host;

  imagePath = AppSettings.ASSET_PROFILE_IMAGE;
}
