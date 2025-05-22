import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector, inject, provideAppInitializer } from '@angular/core';
import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ObserversModule } from '@angular/cdk/observers';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { appInitializerFactory } from './app-initializer.factory';

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ObserversModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
    })
  ],
  providers: [
    provideAppInitializer(() => {
        const initializerFn = (appInitializerFactory)(inject(TranslateService), inject(Injector));
        return initializerFn();
      }),
    provideHttpClient(withInterceptorsFromDi())
  ]
})
export class AppModule { }
