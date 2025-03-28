import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
    selector: '[bpActive]',
    standalone: false
})
export class ActiveDirective {
  @Input('bpActive') condition: boolean;
  @HostBinding('class.active') get active() { return this.condition; }
}
