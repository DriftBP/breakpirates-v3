import { Component, OnDestroy } from '@angular/core';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

import { AppSettings } from '../app-settings';

@Component({
    selector: 'bp-standalone-player',
    templateUrl: './standalone-player.component.html',
    styleUrls: ['./standalone-player.component.scss'],
    standalone: false
})
export class StandalonePlayerComponent implements OnDestroy {
  assetRoot = AppSettings.ASSET_ROOT;
  faExclamationTriangle = faExclamationTriangle;

  siteUrl: string;

  constructor() {
    document.body.className = 'bp-popup';

    this.siteUrl = 'https://www.breakpirates.com';
  }

  ngOnDestroy(): void {
    document.body.className = '';
  }
}
