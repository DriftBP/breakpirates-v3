import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { BreadcrumbConfigItem } from '../../shared/breadcrumb/breadcrumb-config-item';
import { toolsConfigInactive } from '../../shared/breadcrumb/breadcrumb-config';
import { BreadcrumbService } from '../../shared/services/breadcrumb/breadcrumb.service';

type TechnicsModel = 'SL-1200' | 'SL-1210';
type ModelVariant = 'unknown' | 'MK2' | 'MK3' | 'MK3D' | 'LTD' | 'MK5' | 'MK5G' | 'MK6' | 'MK7';

const variantProductionYears: Record<Exclude<ModelVariant, 'unknown'>, [number, number]> = {
  MK2: [1979, 2010],
  MK3: [1989, 1997],
  MK3D: [1997, 1997],
  LTD: [1995, 1995],
  MK5: [2000, 2010],
  MK5G: [2002, 2010],
  MK6: [2007, 2008],
  MK7: [2019, 2026]
};

const seriesProductionYears: [number, number][] = [[1972, 2010], [2016, 2026]];

const variantDetails: Partial<Record<Exclude<ModelVariant, 'unknown'>, string>> = {
  MK2: 'Introduced in 1979 with quartz lock, a pitch fader, and a vibration-damping cabinet.',
  MK3: 'Introduced in 1989 with a T.N.R.C. cabinet and a slipmat included.',
  MK3D: 'Released in 1997 as a minor-change version of the MK3, with a reset point on the pitch control and improved club usability.',
  LTD: 'Released in 1995 as a limited-edition commemorative model to mark the 2 millionth SL-1200-series unit sold.',
  MK5: 'Introduced in 2000 with adjustable brake speed and a long-life white stylus LED.',
  MK5G: 'Introduced in 2002 with a wider pitch range and tonearm horizontal-load adjustment.',
  MK6: 'Released in 2007-08 with tonearm-mounting and vibration-damping improvements.',
  MK7: 'Introduced in 2019 with a coreless direct-drive motor, digital pitch control, and reverse play.'
};

const modelHistory: Partial<Record<Exclude<ModelVariant, 'unknown'>, { summary: string; scene: string }>> = {
  MK2: {
    summary: 'The SL-1200MK2 arrived in 1979 and became the classic club deck of the 1980s and 1990s, prized for its stable quartz lock and direct-drive feel.',
    scene: 'In the UK hardcore, jungle and drum & bass scene, the MK2 became a default club-standard deck because of its reliability and the feel that DJs wanted in fast, demanding sets.'
  },
  MK3: {
    summary: 'The SL-1200MK3 arrived in 1989 and is associated with the late-1980s/early-1990s club era, when the deck was already a core part of DJ culture.',
    scene: 'The MK3 is widely seen in early rave, hardcore and jungle setups, especially as the genre shifted from vinyl-driven club sessions into the 90s breakbeat era.'
  },
  MK3D: {
    summary: 'The SL-1200MK3D was released in 1997 as a refined MK3 with improved pitch control feel and ease of use for club play.',
    scene: 'This minor-change model sits in the late-1990s club era, when the SL-1200 was already central to dance music and the emerging jungle and drum & bass scenes.'
  },
  LTD: {
    summary: 'The SL-1200LTD was released in 1995 as a limited-edition model to commemorate two million SL-1200-series units sold.',
    scene: 'The LTD is a collector-era variant rather than a main production line, but it reflects the peak of late-1990s DJ culture and the growth of turntablism and club performance.'
  },
  MK5: {
    summary: 'The SL-1200MK5 appeared in 2000 and became the long-running standard for the 2000s club era, with a familiar, durable build that still appealed to selectors.',
    scene: 'The MK5 is a common sight in early-2000s rave, jungle and drum & bass rigs, when many DJs were still building their setups around dependable Technics.'
  },
  MK5G: {
    summary: 'The SL-1200MK5G arrived in 2002 and was a popular upgrade in the 2000s, offering a wider pitch range and a familiar direct-drive platform.',
    scene: 'The MK5G became especially familiar in the UK drum & bass and jungle revival era, where reliability and speed mattered as much as tone and feel.'
  },
  MK6: {
    summary: 'The SL-1200MK6 arrived in the late 2000s and reflects the era when the SL-1200 stayed highly relevant in professional club use while the market moved toward a more modern feel.',
    scene: 'The MK6 was used in the late 2000s and early 2010s club scene, when many DJs were still bridging the classic Technics era into modern drum & bass and breakbeat culture.'
  },
  MK7: {
    summary: 'The SL-1200MK7 came out in 2019 and redefined the modern Technics benchmark with a coreless drive, digital pitch control and a refreshed club-focused design.',
    scene: 'The MK7 remains a current standard in modern hardcore, jungle and drum & bass booths, where the deck continues to be a trusted workhorse in both club and festival rigs.'
  }
};

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
    { value: 'MK3D', label: 'MK3D' },
    { value: 'LTD', label: 'LTD' },
    { value: 'MK5', label: 'MK5' },
    { value: 'MK5G', label: 'MK5G' },
    { value: 'MK6', label: 'MK6' },
    { value: 'MK7', label: 'MK7' }
  ];

  get revisionDetails(): string | null {
    return this.modelVariant === 'unknown' ? null : variantDetails[this.modelVariant] ?? null;
  }

  get modelHistorySummary(): string | null {
    if (this.modelVariant === 'unknown') {
      return 'The SL-1200 and SL-1210 became the defining DJ decks of UK club culture, especially in the hardcore, jungle and drum & bass scene, where reliability and a familiar feel mattered more than a single factory stamp.';
    }

    return modelHistory[this.modelVariant]?.summary ?? null;
  }

  get modelSceneSummary(): string | null {
    if (this.modelVariant === 'unknown') {
      return 'Technics became a club standard across the UK because the direct-drive feel, reliability and familiar control layout fitted the quick, demanding pace of hardcore, jungle and drum & bass performance.';
    }

    return modelHistory[this.modelVariant]?.scene ?? null;
  }

  get sceneAssociations(): string[] {
    return [];
  }

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

  onModelVariantChange(variant: ModelVariant): void {
    this.modelVariant = variant;
    if (this.hasSearched) {
      this.lookup();
    }
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
