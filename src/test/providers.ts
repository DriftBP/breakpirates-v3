import { Provider } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { MockTranslateService } from './services/mock.translate.service';

export const translateTestingImports = [TranslatePipe];

export const translateTestingProviders: Provider[] = [
  {
    provide: TranslateService,
    useClass: MockTranslateService
  }
];

export const activatedRouteTestingProvider: Provider = {
  provide: ActivatedRoute,
  useValue: {}
};
