import { Component, Input } from '@angular/core';
import { faHeadphonesAlt } from '@fortawesome/free-solid-svg-icons';

import { Host } from '../../profile/host';

@Component({
  selector: 'bp-host-button',
  templateUrl: './host-button.component.html',
  styleUrls: ['./host-button.component.scss']
})
export class HostButtonComponent {
  @Input() host: Host;

  faHeadphonesAlt = faHeadphonesAlt;
}
