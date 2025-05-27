import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeadphonesAlt } from '@fortawesome/free-solid-svg-icons';

import { Host } from '../../profile/host';
import { SortOrder } from '../../shared/pipes/sort-order';
import { SortByPipe } from '../../shared/pipes/sort-by.pipe';

@Component({
    selector: 'bp-host-list',
    templateUrl: './host-list.component.html',
    styleUrls: ['./host-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
      RouterModule,
      FontAwesomeModule,
      SortByPipe
    ]
})
export class HostListComponent {
  hosts = input.required<Host[]>();

  order = SortOrder.Ascending;
  faHeadphonesAlt = faHeadphonesAlt;
}
