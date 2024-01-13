import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { HostNavigation } from './host-navigation';

@Component({
  selector: 'bp-host-navigation',
  templateUrl: './host-navigation.component.html',
  styleUrls: ['./host-navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HostNavigationComponent {
  @Input({ required: true }) hostLinks: HostNavigation;
}
