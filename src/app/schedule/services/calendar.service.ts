import { Injectable, inject } from '@angular/core';
import { DateTime } from 'luxon';

import { Show } from '../models/show';
import { ShowService } from './show.service';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  private readonly showService = inject(ShowService);

  downloadShow(show: Show): void {
    const event = this.createEvent(show);
    const blob = new Blob([event], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = `${this.fileName(show.title)}.ics`;
    link.click();
    URL.revokeObjectURL(url);
  }

  createEvent(show: Show): string {
    const { startDate, endDate } = this.showService.getDates(show);
    const timezone = this.showService.showTimezone;
    const description = show.description ?? '';
    const hosts = show.hosts.map(host => host.name).join(', ');
    const details = [description, hosts ? `Hosted by: ${hosts}` : '']
      .filter(Boolean)
      .join('\n\n');
    const uid = `show-${show.id}-${startDate.toMillis()}@breakpirates.com`;

    return [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Break Pirates//Show Schedule//EN',
      'CALSCALE:GREGORIAN',
      'BEGIN:VEVENT',
      `UID:${uid}`,
      `DTSTAMP:${this.formatUtc(DateTime.now())}`,
      `DTSTART;TZID=${timezone}:${this.formatLocal(startDate)}`,
      `DTEND;TZID=${timezone}:${this.formatLocal(endDate)}`,
      `SUMMARY:${this.escape(show.title)}`,
      `DESCRIPTION:${this.escape(details)}`,
      'LOCATION:Break Pirates',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');
  }

  private formatLocal(date: DateTime): string {
    return date.toFormat("yyyyMMdd'T'HHmmss");
  }

  private formatUtc(date: DateTime): string {
    return date.toUTC().toFormat("yyyyMMdd'T'HHmmss'Z'");
  }

  private escape(value: string): string {
    return value
      .replace(/\\/g, '\\\\')
      .replace(/;/g, '\\;')
      .replace(/,/g, '\\,')
      .replace(/\r?\n/g, '\\n');
  }

  private fileName(title: string): string {
    return title.trim().replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '') || 'break-pirates-show';
  }
}
