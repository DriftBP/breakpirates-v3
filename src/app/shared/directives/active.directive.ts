import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appActive]'
})
export class ActiveDirective {
  @Input() appActive: boolean;
  @HostBinding('class.active') get active() { return this.appActive; }
}
