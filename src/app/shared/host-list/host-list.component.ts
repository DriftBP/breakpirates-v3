import { Component, Input } from '@angular/core';

import { Host } from '../../profile/host';

@Component({
  selector: 'app-host-list',
  templateUrl: './host-list.component.html',
  styleUrls: ['./host-list.component.scss']
})
export class HostListComponent {
  @Input() hosts: Host[];

}
