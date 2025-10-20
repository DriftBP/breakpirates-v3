import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule, KeyValuePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

import { HostNavigation } from './host-navigation';

@Component({
    selector: 'bp-host-navigation',
    templateUrl: './host-navigation.component.html',
    styleUrls: ['./host-navigation.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
      FontAwesomeModule,
      CommonModule,
      RouterLink,
      TranslatePipe,
      KeyValuePipe
    ]
})
export class HostNavigationComponent {
  hostLinks = input.required<HostNavigation>();

  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;
}
