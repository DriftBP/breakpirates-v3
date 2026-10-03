import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { BreadcrumbConfigItem } from '../../shared/breadcrumb/breadcrumb-config-item';
import { toolsConfigInactive } from '../../shared/breadcrumb/breadcrumb-config';
import { BreadcrumbService } from '../../shared/services/breadcrumb/breadcrumb.service';

type TechnicsModel = 'SL-1200' | 'SL-1210';
type ModelVariant = 'unknown' | 'MK2' | 'MK3' | 'MK4' | 'MK5' | 'MK5G' | 'MK6' | 'MK7';

const variantProductionYears: Record<Exclude<ModelVariant, 'unknown'>, [number, number]> = {
  MK2: [1979, 2010],
  MK3: [1989, 1997],
  MK4: [1997, 1997],
  MK5: [2000, 2010],
  MK5G: [2002, 2010],
  MK6: [2007, 2008],
  MK7: [2019, 2026]
};

const seriesProductionYears: [number, number][] = [[1972, 2010], [2016, 2026]];

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
  modelVariant: ModelVariant = 'unknown';
  serialNumber = '';
  searchedSerial = '';
  manufactureMonth: string | null = null;
  manufactureDay: number | null = null;
  yearSuffix: string | null = null;
  possibleYears: number[] = [];
  hasSearched = false;

  readonly modelVariants: { value: ModelVariant; label: string }[] = [
    { value: 'unknown', label: 'Not sure / other' },
    { value: 'MK2', label: 'MK2' },
    { value: 'MK3', label: 'MK3' },
    { value: 'MK4', label: 'MK4' },
    { value: 'MK5', label: 'MK5' },
    { value: 'MK5G', label: 'MK5G' },
    { value: 'MK6', label: 'MK6' },
    { value: 'MK7', label: 'MK7' }
  ];

  ngOnInit(): void {
    this.breadcrumbService.setBreadcrumb(this.breadcrumbConfig);
  }

  lookup(): void {
    const serial = this.serialNumber.trim().replace(/\s+/g, ' ').toUpperCase();
    if (!/^[A-Z0-9]{10,11}$/.test(serial)) {
      return;
    }

    this.searchedSerial = serial;
    this.decodeDateCode(serial);
    this.hasSearched = true;
  }

  private decodeDateCode(serial: string): void {
    const letterMonthCode = /^[A-Z]{2}(\d)([A-L])/.exec(serial);
    const numericMonthCode = /^[A-Z]{2}(\d)([1-9])(\d{2})/.exec(serial);

    if (letterMonthCode) {
      this.yearSuffix = letterMonthCode[1];
      this.manufactureMonth = this.getMonthName(letterMonthCode[2].charCodeAt(0) - 'A'.charCodeAt(0) + 1);
      this.manufactureDay = null;
    } else if (numericMonthCode) {
      const month = Number(numericMonthCode[2]);
      const day = Number(numericMonthCode[3]);
      const daysInMonth = new Date(Date.UTC(2000, month, 0)).getUTCDate();
      if (day < 1 || day > daysInMonth) {
        this.clearDateCode();
        return;
      }

      this.yearSuffix = numericMonthCode[1];
      this.manufactureMonth = this.getMonthName(month);
      this.manufactureDay = day;
    } else {
      this.clearDateCode();
      return;
    }

    this.possibleYears = this.getPossibleYears(Number(this.yearSuffix));
  }

  private getMonthName(month: number): string {
    return [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ][month - 1];
  }

  private getPossibleYears(yearSuffix: number): number[] {
    const ranges = this.modelVariant === 'unknown'
      ? seriesProductionYears
      : [variantProductionYears[this.modelVariant]];

    return ranges.flatMap(([firstYear, lastYear]) => {
      const years: number[] = [];
      for (let year = firstYear; year <= lastYear; year++) {
        if (year % 10 === yearSuffix) {
          years.push(year);
        }
      }
      return years;
    });
  }

  private clearDateCode(): void {
    this.manufactureMonth = null;
    this.manufactureDay = null;
    this.yearSuffix = null;
    this.possibleYears = [];
  }

  reset(): void {
    this.serialNumber = '';
    this.searchedSerial = '';
    this.clearDateCode();
    this.hasSearched = false;
  }
}
