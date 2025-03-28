import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { faHeadphonesAlt } from '@fortawesome/free-solid-svg-icons';

import { Host } from '../../profile/host';
import { SortOrder } from '../../shared/pipes/sort-order';

@Component({
    selector: 'bp-host-list',
    templateUrl: './host-list.component.html',
    styleUrls: ['./host-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class HostListComponent {
  hosts = input.required<Host[]>();

  order = SortOrder.Ascending;
  faHeadphonesAlt = faHeadphonesAlt;
}
