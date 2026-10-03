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
  manufactureMonth: string | null = null;
  yearSuffix: string | null = null;
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
    const dateCode = /^[A-Z]{2}(\d)([A-L])/.exec(serial);
    if (dateCode) {
      const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];
      this.yearSuffix = dateCode[1];
      this.manufactureMonth = months[dateCode[2].charCodeAt(0) - 'A'.charCodeAt(0)];
    } else {
      this.yearSuffix = null;
      this.manufactureMonth = null;
    }
    this.hasSearched = true;
  }

  reset(): void {
    this.serialNumber = '';
    this.searchedSerial = '';
    this.manufactureMonth = null;
    this.yearSuffix = null;
    this.hasSearched = false;
  }
}
