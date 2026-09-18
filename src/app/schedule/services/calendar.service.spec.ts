import { TestBed } from '@angular/core/testing';

import { CalendarService } from './calendar.service';
import { mockShow } from '../../../test/data/mock.shows';

describe('CalendarService', () => {
  let service: CalendarService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CalendarService]
    });

    service = TestBed.inject(CalendarService);
  });

  it('creates an iCalendar event for a show', () => {
    const event = service.createEvent({
      ...mockShow,
      title: 'Night; Flight, Special',
      description: 'A late-night set',
      hosts: [{
        id: 1,
        name: 'DJ Test',
        biog: null,
        image: null,
        location: null,
        mixcloud: null,
        twitter: null
      }]
    });

    expect(event).toContain('BEGIN:VCALENDAR');
    expect(event).toContain('BEGIN:VEVENT');
    expect(event).toContain('SUMMARY:Night\\; Flight\\, Special');
    expect(event).toContain('DESCRIPTION:A late-night set\\n\\nHosted by: DJ Test');
    expect(event).toContain('LOCATION:Break Pirates');
    expect(event).toContain('END:VCALENDAR');
  });
});
