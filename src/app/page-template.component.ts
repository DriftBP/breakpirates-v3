import { Component, AfterViewInit } from '@angular/core';
import { DateTime } from 'luxon';

import { AppSettings } from './app-settings';
import { DialogService } from './shared/services/dialog/dialog.service';
import { IDialogConfig } from './shared/services/dialog/dialog-config';
import { DialogComponent } from './shared/dialog/dialog.component';
import { SupportedBrowsersNoticeComponent } from './shared/supported-browsers-notice/supported-browsers-notice.component';
import { NavigationComponent } from './shared/navigation/navigation.component';
import { NowPlayingComponent } from './shared/now-playing/now-playing.component';
import { BreadcrumbComponent } from './shared/breadcrumb/breadcrumb.component';
import { RouterModule } from '@angular/router';
import { AdUnitComponent } from './shared/ad-unit/ad-unit.component';
import { FooterComponent } from './shared/footer/footer.component';
import { FooterBarComponent } from './shared/footer-bar/footer-bar.component';

@Component({
  selector: 'bp-page-template',
  templateUrl: './page-template.component.html',
  styleUrls: ['./page-template.component.scss'],
  imports: [
    DialogComponent,
    SupportedBrowsersNoticeComponent,
    NavigationComponent,
    NowPlayingComponent,
    BreadcrumbComponent,
    AdUnitComponent,
    FooterComponent,
    FooterBarComponent,
    RouterModule
  ]
})
export class PageTemplateComponent implements AfterViewInit {
  constructor (
    private dialogService: DialogService
  ) {}

  ngAfterViewInit() {
    const hideDialogDate = DateTime.utc(2021, 9, 18, 23, 0);

    if (DateTime.utc() < hideDialogDate && this.dialogService.isDialogSupported()) {
      const alt = 'Break Pirates 20th birthday';
      const dialogConfig: IDialogConfig = {
        title: alt,
        content: `<img src="${AppSettings.ASSET_NEWS_IMAGE}20th-birthday-flyer.jpg" width="1024" height="768" alt="${alt}" style="max-width: 100%; height: auto">`
      };

      this.dialogService.showDialog(dialogConfig);
    }
  }
}
