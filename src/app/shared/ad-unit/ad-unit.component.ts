import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { AppSettings } from '../../app-settings';

@Component({
  selector: 'bp-ad-unit',
  templateUrl: './ad-unit.component.html',
  styleUrls: ['./ad-unit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdUnitComponent {
  adSlot = input.required<number>();

  adsenseClient = AppSettings.ADSENSE_CLIENT;
}
