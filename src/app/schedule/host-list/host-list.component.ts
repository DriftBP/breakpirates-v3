import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { faHeadphonesAlt } from '@fortawesome/free-solid-svg-icons';

import { Host } from '../../profile/host';
import { SortOrder } from '../../shared/pipes/sort-order';

@Component({
  selector: 'bp-host-list',
  templateUrl: './host-list.component.html',
  styleUrls: ['./host-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HostListComponent {
  @Input({ required: true }) hosts: Host[] = [];

  order = SortOrder.Ascending;
  faHeadphonesAlt = faHeadphonesAlt;
}
