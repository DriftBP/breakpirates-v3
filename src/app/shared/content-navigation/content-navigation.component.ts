import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

import { ContentNavigation } from './content-navigation';

@Component({
  selector: 'bp-content-navigation',
  templateUrl: './content-navigation.component.html',
  styleUrls: ['./content-navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FontAwesomeModule,
    RouterLink,
    TranslatePipe
  ]
})
export class ContentNavigationComponent {
  navigation = input<ContentNavigation | null>(null);
  routeBase = input.required<string>();

  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;
}
