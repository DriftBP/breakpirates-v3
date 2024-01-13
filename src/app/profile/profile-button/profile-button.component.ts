import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';

import { Host } from '../host';
import { AppSettings } from '../../app-settings';

@Component({
  selector: 'bp-profile-button',
  templateUrl: './profile-button.component.html',
  styleUrls: ['./profile-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileButtonComponent implements OnChanges {
  @Input({ required: true }) host: Host;

  imagePath: string;

  ngOnChanges() {
    if (this.host) {
      this.imagePath = `url(${AppSettings.ASSET_PROFILE_IMAGE}${this.host.image})`;
    }
  }
}
