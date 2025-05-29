import { Component, OnDestroy } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { TranslatePipe } from '@ngx-translate/core';

import { AppSettings } from '../app-settings';
import { RadioPlayerComponent } from '../shared/radio-player/radio-player.component';
import { NgOptimizedImage } from '@angular/common';

@Component({
    selector: 'bp-standalone-player',
    templateUrl: './standalone-player.component.html',
    styleUrls: ['./standalone-player.component.scss'],
    imports: [
      NgOptimizedImage,
      FontAwesomeModule,
      RadioPlayerComponent,
      TranslatePipe
    ]
})
export class StandalonePlayerComponent implements OnDestroy {
  assetRoot = AppSettings.ASSET_ROOT;
  faExclamationTriangle = faExclamationTriangle;

  constructor() {
    document.body.className = 'bp-popup';
  }

  ngOnDestroy(): void {
    document.body.className = '';
  }
}
