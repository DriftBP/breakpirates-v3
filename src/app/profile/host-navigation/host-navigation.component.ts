import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Host } from '../host';
import { HostNavigation, HostNavigationType } from './host-navigation-type';

@Component({
  selector: 'bp-host-navigation',
  templateUrl: './host-navigation.component.html',
  styleUrls: ['./host-navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HostNavigationComponent {
  @Input() hostLinks: HostNavigation<HostNavigationType, Host>;

  types = HostNavigationType;

  parseInt(value: string): number {
    return parseInt(value);
  }
}
