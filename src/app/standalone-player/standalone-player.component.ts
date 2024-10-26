import { Component, OnDestroy } from '@angular/core';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

import { AppSettings } from '../app-settings';
import { RadioPlayerComponent } from '../shared/radio-player/radio-player.component';
import { TranslateModule } from '@ngx-translate/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'bp-standalone-player',
  templateUrl: './standalone-player.component.html',
  styleUrls: ['./standalone-player.component.scss'],
  imports: [
    RadioPlayerComponent,
    TranslateModule,
    FontAwesomeModule,
    NgOptimizedImage
  ],
  standalone: true
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
