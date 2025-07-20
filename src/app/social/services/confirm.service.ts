import { Injectable, inject } from '@angular/core';
import { TranslateService, Translation } from '@ngx-translate/core';
import { Observable, Observer } from 'rxjs';

@Injectable()
export class ConfirmService {
  private readonly translateService = inject(TranslateService);


  confirm(translateKey: string): Observable<boolean> {
    return new Observable((observer: Observer<boolean>) => {
      this.translateService.get(translateKey)
        .subscribe((t: Translation) => {
          if (window.confirm(t)) {
            observer.next(true);
          } else {
            observer.next(false);
          }
        });

      observer.complete();
    });
  }
}
