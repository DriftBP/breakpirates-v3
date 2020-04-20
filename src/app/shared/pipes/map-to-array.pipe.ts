import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

// https://forum.ionicframework.com/t/inserting-html-via-angular-2-use-of-domsanitizationservice-bypasssecuritytrusthtml/62562/2
@Pipe({
    name: 'mapToArray'
})
export class MapToArrayPipe implements PipeTransform {
  constructor(protected _sanitizer: DomSanitizer) {}

  public transform(value, args: string[]): any {
    const arr = [];
    for (let key in value) {
      arr.push({key: key, value: value[key]});
    }
    return arr;
  }
}
