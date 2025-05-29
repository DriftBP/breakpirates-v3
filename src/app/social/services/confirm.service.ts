import { Injectable } from '@angular/core';
import { TranslateService, Translation } from '@ngx-translate/core';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfirmService {

  constructor(
    private readonly translateService: TranslateService
  ) {}

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
