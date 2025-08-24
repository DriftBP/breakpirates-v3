import { Injectable } from '@angular/core';

@Injectable()
export class ScrollService {
  readonly scrollBehavior = 'smooth'

  public scrollToTop(): void {
    window.scrollTo({top: 0, behavior: this.scrollBehavior});
  }
}
