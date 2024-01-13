import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { AppSettings } from '../../app-settings';

@Component({
  selector: 'bp-ad-unit',
  templateUrl: './ad-unit.component.html',
  styleUrls: ['./ad-unit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdUnitComponent {
  @Input({ required: true }) adSlot: number | null = null;

  adsenseClient = AppSettings.ADSENSE_CLIENT;
}
