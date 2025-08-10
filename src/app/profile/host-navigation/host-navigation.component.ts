import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule, KeyValuePipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

import { HostNavigation } from './host-navigation';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'bp-host-navigation',
    templateUrl: './host-navigation.component.html',
    styleUrls: ['./host-navigation.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
      FontAwesomeModule,
      CommonModule,
      RouterModule,
      TranslatePipe,
      KeyValuePipe
    ]
})
export class HostNavigationComponent {
  hostLinks = input.required<HostNavigation>();

  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;
}
