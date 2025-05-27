import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule, KeyValuePipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

import { HostNavigation } from './host-navigation';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'bp-host-navigation',
    templateUrl: './host-navigation.component.html',
    styleUrls: ['./host-navigation.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
      CommonModule,
      RouterModule,
      TranslatePipe,
      KeyValuePipe
    ]
})
export class HostNavigationComponent {
  hostLinks = input.required<HostNavigation>();
}
