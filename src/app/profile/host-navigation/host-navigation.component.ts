import { CommonModule } from '@angular/common';

import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { HostNavigation } from './host-navigation';

@Component({
  selector: 'bp-host-navigation',
  templateUrl: './host-navigation.component.html',
  styleUrls: ['./host-navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterModule, TranslateModule],
  standalone: true
})
export class HostNavigationComponent {
  hostLinks = input.required<HostNavigation>();
}
