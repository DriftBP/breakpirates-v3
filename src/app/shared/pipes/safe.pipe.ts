import { Pipe, PipeTransform, inject } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';

// https://forum.ionicframework.com/t/inserting-html-via-angular-2-use-of-domsanitizationservice-bypasssecuritytrusthtml/62562/2
@Pipe({
    name: 'safe'
})
export class SafePipe implements PipeTransform {
  protected _sanitizer = inject(DomSanitizer);


  public transform(value: string, type: string): SafeHtml | SafeStyle | SafeScript | SafeUrl | SafeResourceUrl {
      switch (type) {
          case 'html':
              return this._sanitizer.bypassSecurityTrustHtml(value);
          case 'style':
              return this._sanitizer.bypassSecurityTrustStyle(value);
          case 'script':
              return this._sanitizer.bypassSecurityTrustScript(value);
          case 'url':
              return this._sanitizer.bypassSecurityTrustUrl(value);
          default:
              throw new Error(`Unable to bypass security for invalid type: ${type}`);
      }
  }
}
