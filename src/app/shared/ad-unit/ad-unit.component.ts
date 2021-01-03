import { Component, Input } from '@angular/core';

import { AppSettings } from '../../app-settings';

@Component({
  selector: 'bp-ad-unit',
  templateUrl: './ad-unit.component.html',
  styleUrls: ['./ad-unit.component.scss']
})
export class AdUnitComponent {
  @Input() adSlot: number;
  @Input() width: number;
  @Input() height: number;

  adsenseClient = AppSettings.ADSENSE_CLIENT;
}
