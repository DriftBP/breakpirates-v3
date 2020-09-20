import { Directive, ElementRef, HostListener } from '@angular/core';

import { IDialogConfig } from '../services/dialog-config';
import { DialogService } from '../services/dialog.service';

@Directive({
  selector: '[appImageClick]'
})
export class ImageClickDirective {
  @HostListener('click', ['$event']) onClick(e: any) {
    if (this.dialogService.isDialogSupported()) {
      e.preventDefault();
      e.stopPropagation();
      const src = this.element.nativeElement['src'];
      const width = this.element.nativeElement['width'];
      const height = this.element.nativeElement['height'];
      const alt = this.element.nativeElement['alt'];

      const config: IDialogConfig = {
        title: alt,
        content: `<img src="${src}" width="${width}" height="${height}" alt="${alt}">`
      };

      this.dialogService.showDialog(config);
    }
  }

  constructor(
    private dialogService: DialogService,
    private element: ElementRef
  ) {}
}
