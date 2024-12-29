import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

import { HostNavigation } from './host-navigation';

@Component({
  selector: 'bp-host-navigation',
  templateUrl: './host-navigation.component.html',
  styleUrls: ['./host-navigation.component.scss'],
  imports: [
    CommonModule,
    TranslatePipe,
    RouterModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HostNavigationComponent {
  hostLinks = input.required<HostNavigation>();
}
