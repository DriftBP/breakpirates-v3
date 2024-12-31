import { ChangeDetectionStrategy, Component, Signal, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { Host } from '../host';
import { AppSettings } from '../../app-settings';
import { SafePipe } from '../../shared/pipes/safe.pipe';

@Component({
  selector: 'bp-profile-button',
  templateUrl: './profile-button.component.html',
  styleUrls: ['./profile-button.component.scss'],
  imports: [
    CommonModule,
    RouterModule,
    SafePipe
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileButtonComponent {
  host = input.required<Host>();

  imagePath: Signal<string>;

  constructor() {
    this.imagePath = computed(() => {
      return this.host()?.image ? `url(${AppSettings.ASSET_PROFILE_IMAGE}${this.host().image})` : undefined;
    });
  }
}
