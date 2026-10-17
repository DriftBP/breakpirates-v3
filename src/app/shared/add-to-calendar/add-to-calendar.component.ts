import { Component, inject, input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { TranslatePipe } from '@ngx-translate/core';

import { Show } from '../../schedule/models/show';
import { CalendarService } from '../../schedule/services/calendar.service';

@Component({
  selector: 'bp-add-to-calendar',
  templateUrl: './add-to-calendar.component.html',
  styleUrls: ['./add-to-calendar.component.scss'],
  imports: [
    FontAwesomeModule,
    TranslatePipe
  ]
})
export class AddToCalendarComponent {
  private readonly calendarService = inject(CalendarService);

  show = input.required<Show>();
  faCalendar = faCalendar;

  addToCalendar(): void {
    this.calendarService.downloadShow(this.show());
  }
}
