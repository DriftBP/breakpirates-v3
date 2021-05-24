import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input } from '@angular/core';
import { faHeadphonesAlt } from '@fortawesome/free-solid-svg-icons';

import { Host } from '../../profile/host';

@Component({
  selector: 'bp-host-button',
  templateUrl: './host-button.component.html',
  styleUrls: ['./host-button.component.scss'],
  animations: [
    trigger(
      'inOutAnimation',
      [
        transition(
          ':enter',
          [
            style({ opacity: 0, transform: 'translateY(1em)' }),
            animate('0.25s ease-out', style({ opacity: 1, transform: 'translateY(0);' }))
          ]
        ),
        transition(
          ':leave',
          [
            style({ opacity: 1 }),
            animate('0.25s ease-in', style({ opacity: 0 }))
          ]
        )
      ]
    )
  ]
})
export class HostButtonComponent {
  @Input() host: Host;

  faHeadphonesAlt = faHeadphonesAlt;

  hover = false;

  onMouseOver(event: any) {
    this.hover = true;
  }

  onMouseOut(event: any) {
    this.hover = false;
  }
}
