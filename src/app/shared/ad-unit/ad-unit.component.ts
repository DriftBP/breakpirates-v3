import { Component, Input, OnChanges, OnDestroy } from '@angular/core';

import { AppSettings } from '../../app-settings';

@Component({
  selector: 'bp-ad-unit',
  templateUrl: './ad-unit.component.html',
  styleUrls: ['./ad-unit.component.scss']
})
export class AdUnitComponent implements OnChanges, OnDestroy {
  @Input() adSlot: number;
  @Input() width: number;
  @Input() height: number;
  @Input() refreshSecs: number;

  private interval: number;
  private refreshMs = 0;
  private refreshDelayMs = 10;

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

      this.interval = window.setInterval(this.onRefresh.bind(this), this.refreshMs);
    }
  }

  ngOnDestroy() {
    if (this.interval) {
      window.clearInterval(this.interval);
    }
  }

  private hideAd(): void {
    this.displayAd = false;
  }

  private showAd(): void {
    this.displayAd = true;
  }

  private onRefresh(): void {
    this.hideAd();

    window.setTimeout(() => {
      this.showAd();
    }, this.refreshDelayMs);
  }
}
