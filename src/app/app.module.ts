import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER, Injector } from '@angular/core';
import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ObserversModule } from '@angular/cdk/observers';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { appInitializerFactory } from './app-initializer.factory';
import { PageTemplateComponent } from './page-template.component';

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
      AppComponent,
      PageTemplateComponent
  ],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ObserversModule,
    SharedModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
        }
    }),
    FontAwesomeModule
  ],
  providers: [
    {
        provide: APP_INITIALIZER,
        useFactory: appInitializerFactory,
        deps: [TranslateService, Injector],
        multi: true
    },
    provideHttpClient(withInterceptorsFromDi())
  ]
})
export class AppModule { }
