import { LOCATION_INITIALIZED } from '@angular/common';
import { Injector } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

export function appInitializerFactory(translate: TranslateService, injector: Injector) {
  return () => new Promise<any>((resolve: any) => {
    const locationInitialized = injector.get(LOCATION_INITIALIZED, Promise.resolve(null));
    locationInitialized.then(() => {
      const langToSet = 'en';
      translate.setDefaultLang(langToSet);
      translate.use(langToSet)
        .subscribe({
          next: () => {},
          error: () => {},
          complete: () => { resolve(null); }
        });
    });
  });
}
