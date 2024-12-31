import { Component, OnDestroy } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

import { AppSettings } from '../app-settings';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RadioPlayerComponent } from '../shared/radio-player/radio-player.component';

@Component({
  selector: 'bp-standalone-player',
  templateUrl: './standalone-player.component.html',
  styleUrls: ['./standalone-player.component.scss'],
  imports: [
    RadioPlayerComponent,
    NgOptimizedImage,
    FontAwesomeModule,
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
