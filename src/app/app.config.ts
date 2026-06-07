import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ApplicationConfig, inject, Injector, provideAppInitializer, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding, withInMemoryScrolling } from '@angular/router';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';

import { routes } from './app.routes';
import { appInitializerFactory } from './app-initializer.factory';

// Export providers for use with bootstrapApplication
export const appProviders = [
  provideAppInitializer(() => {
    const initializerFn = (appInitializerFactory)(inject(TranslateService), inject(Injector));
    return initializerFn();
  }),
  provideHttpClient(withInterceptorsFromDi())
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    appProviders,
    provideZonelessChangeDetection(),
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: "top",
      }),
      withComponentInputBinding()
    ),
    provideTranslateService(
      {
        fallbackLang: 'en',
        loader: provideTranslateHttpLoader({
          prefix: "./assets/i18n/",
          suffix: ".json"
        })
      }
    )
  ]
};
