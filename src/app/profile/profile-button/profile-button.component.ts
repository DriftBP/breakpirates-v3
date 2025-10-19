import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Signal, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Host } from '../host';
import { AppSettings } from '../../app-settings';
import { SafePipe } from '../../shared/pipes/safe.pipe';

@Component({
    selector: 'bp-profile-button',
    templateUrl: './profile-button.component.html',
    styleUrls: ['./profile-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
      CommonModule,
      RouterLink,
      SafePipe
    ]
})
export class ProfileButtonComponent {
  host = input.required<Host>();

  imagePath: Signal<string | undefined>;

  constructor() {
    this.imagePath = computed(() => {
      return this.host()?.image ? `url(${AppSettings.ASSET_PROFILE_IMAGE}${this.host().image})` : undefined;
    });
  }
}
