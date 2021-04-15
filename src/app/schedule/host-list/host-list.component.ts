import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Host } from '../../profile/host';

@Component({
  selector: 'bp-host-list',
  templateUrl: './host-list.component.html',
  styleUrls: ['./host-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HostListComponent {
  @Input() hosts: Host[];

}
