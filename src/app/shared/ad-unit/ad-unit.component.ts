import { Component, Input, OnChanges } from '@angular/core';

import { AppSettings } from '../../app-settings';

@Component({
  selector: 'bp-ad-unit',
  templateUrl: './ad-unit.component.html',
  styleUrls: ['./ad-unit.component.scss']
})
export class AdUnitComponent implements OnChanges {
  @Input() adUnit: number;
  @Input() width: number;
  @Input() height: number;
  @Input() refreshSecs: number;

  private interval: number;
  private refreshMs = 0;
  private refreshAfterMs = 1000;

  adsenseClient = AppSettings.ADSENSE_CLIENT;
  displayAd: boolean;

  constructor() {
    this.showAd();
  }

  ngOnChanges() {
    if (this.refreshSecs) {
      this.refreshMs = this.refreshSecs * 1000;

      if (this.interval) {
        window.clearInterval(this.interval);
      }

      this.interval = window.setInterval(this.onRefresh, this.refreshMs);
    }
  }

  displayValue(): string {
    return this.displayAd ? 'block' : 'none';
  }

  hideAd(): void {
    this.displayAd = false;
  }

  showAd(): void {
    this.displayAd = true;
  }

  onRefresh(): void {
    this.hideAd();

    window.setTimeout(() => {
      this.showAd();
    }, this.refreshAfterMs);
  }
}
