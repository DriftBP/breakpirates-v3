import { Injectable, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Observer } from 'rxjs';

@Injectable()
export class ConfirmService {
  private readonly translateService = inject(TranslateService);

  confirm(translateKey: string): Observable<boolean> {
    return new Observable((observer: Observer<boolean>) => {
      const translation = this.translateService.instant(translateKey);

      if (window.confirm(translation)) {
        observer.next(true);
      } else {
        observer.next(false);
      }

      observer.complete();
    });
  }
}
