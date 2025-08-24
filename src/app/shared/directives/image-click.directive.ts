import { Directive, ElementRef, HostListener, Renderer2, inject } from '@angular/core';

import { IDialogConfig } from '../services/dialog/dialog-config';
import { DialogService } from '../services/dialog/dialog.service';

@Directive({
    selector: '[bpImageClick]'
})
export class ImageClickDirective {
  private dialogService = inject(DialogService);
  private element = inject(ElementRef);
  private renderer2 = inject(Renderer2);

  @HostListener('click', ['$event'])
  onClick(e: MouseEvent) {
    if (this.dialogService.isDialogSupported()) {
      e.preventDefault();
      e.stopPropagation();
      const src = this.element.nativeElement['src'];
      const width = this.element.nativeElement['naturalWidth'];
      const height = this.element.nativeElement['naturalHeight'];
      const alt = this.element.nativeElement['alt'];

      const dialogConfig: IDialogConfig = {
        title: alt,
        content: `<img src="${src}" width="${width}" height="${height}" alt="${alt}" style="max-width: 100%; height: auto">`
      };

      this.dialogService.showDialog(dialogConfig);
    }
  }

  @HostListener('mouseover')
  onMouseOver() {
    this.setCursor('pointer');
  }

  @HostListener('mouseout')
  onMouseOut() {
    this.setCursor('auto');
  }

  private setCursor(cursorType: string): void {
    this.renderer2.setStyle(this.element.nativeElement, 'cursor', cursorType);
  }
}
