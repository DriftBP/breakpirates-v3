import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { BreadcrumbConfigItem } from '../../shared/breadcrumb/breadcrumb-config-item';
import { toolsConfigInactive } from '../../shared/breadcrumb/breadcrumb-config';
import { BreadcrumbService } from '../../shared/services/breadcrumb/breadcrumb.service';

type TechnicsModel = 'SL-1200' | 'SL-1210';

@Component({
  selector: 'bp-technics-lookup',
  templateUrl: './technics-lookup.component.html',
  styleUrls: ['./technics-lookup.component.scss'],
  imports: [FormsModule]
})
export default class TechnicsLookupComponent implements OnInit {
  private readonly breadcrumbService = inject(BreadcrumbService);

  private readonly breadcrumbConfig: BreadcrumbConfigItem[] = [
    toolsConfigInactive,
    { name: 'TOOLS.TECHNICS_LOOKUP', isActive: true }
  ];

  model: TechnicsModel = 'SL-1200';
  serialNumber = '';
  searchedSerial = '';
  hasSearched = false;

  ngOnInit(): void {
    this.breadcrumbService.setBreadcrumb(this.breadcrumbConfig);
  }

  lookup(): void {
    const serial = this.serialNumber.trim().replace(/\s+/g, ' ').toUpperCase();
    if (!serial) {
      return;
    }

    this.searchedSerial = serial;
    this.hasSearched = true;
  }

  reset(): void {
    this.serialNumber = '';
    this.searchedSerial = '';
    this.hasSearched = false;
  }
}
