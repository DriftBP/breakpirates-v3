import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function customHttpLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  imports: [
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: customHttpLoader,
        deps: [HttpClient],
      },
      isolate: false
    })
  ],
  exports: [
    TranslateModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class SharedModule { }
