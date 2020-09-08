import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appActive]'
})
export class ActiveDirective {
  @Input('appActive') condition: boolean;
  @HostBinding('class.active') get active() { return this.condition; }
}
