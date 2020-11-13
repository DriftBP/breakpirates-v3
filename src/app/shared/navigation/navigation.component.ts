import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { AppSettings } from '../../app-settings';
import { NavigationService } from '../services/navigation/navigation.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit, OnDestroy {

  private collapsedSubscription: Subscription;

  archiveUrl: string;
  isCollapsed: boolean;
  assetRoot = AppSettings.ASSET_ROOT;

  constructor(
    private readonly navigationService: NavigationService
  ) { }

  ngOnInit() {
    this.archiveUrl = AppSettings.MIXCLOUD_URL;
    this.collapsedSubscription = this.navigationService.isCollapsed.subscribe(isCollapsed => this.isCollapsed = isCollapsed);
  }

  ngOnDestroy() {
    if (this.collapsedSubscription) {
      this.collapsedSubscription.unsubscribe();
    }
  }

  toggleIsCollapsed() {
    this.navigationService.setCollapsed(!this.isCollapsed);
  }
}
