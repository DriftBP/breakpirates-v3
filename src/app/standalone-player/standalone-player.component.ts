import { Component, OnDestroy } from '@angular/core';

import { AppSettings } from '../app-settings';

@Component({
  selector: 'bp-standalone-player',
  templateUrl: './standalone-player.component.html',
  styleUrls: ['./standalone-player.component.scss']
})
export class StandalonePlayerComponent implements OnDestroy {
  assetRoot = AppSettings.ASSET_ROOT;

  constructor() {
    document.body.className = 'bp-popup';
  }

  ngOnDestroy(): void {
    document.body.className = '';
  }
}
