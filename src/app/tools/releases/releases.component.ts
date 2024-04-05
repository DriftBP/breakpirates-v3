import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { BreadcrumbConfigItem } from '../../shared/breadcrumb/breadcrumb-config-item';
import { toolsConfigInactive } from '../../shared/breadcrumb/breadcrumb-config';
import { BreadcrumbService } from '../../shared/services/breadcrumb/breadcrumb.service';
import { AppSettings } from '../../app-settings';

@Component({
  selector: 'bp-releases',
  templateUrl: './releases.component.html'
})
export class ReleasesComponent implements OnInit {
  private breadcrumbConfig: BreadcrumbConfigItem[] = [
    toolsConfigInactive,
    {
      name: 'RELEASES.TITLE',
      isActive: true
    }
  ];

  sheetUrl: SafeResourceUrl;

  constructor(
    private readonly breadcrumbService: BreadcrumbService,
    private readonly sanitizer: DomSanitizer
  ) {
    this.sheetUrl = this.sanitizer.bypassSecurityTrustResourceUrl(AppSettings.RELEASE_TRACKER_SHEET_URL)
  }

  ngOnInit() {
    this.breadcrumbService.setBreadcrumb(this.breadcrumbConfig);
  }
}
