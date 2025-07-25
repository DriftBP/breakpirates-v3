import { Component, ElementRef, HostListener, Renderer2, effect, viewChild, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { IDialogConfig } from '../services/dialog/dialog-config';
import { DialogService } from '../services/dialog/dialog.service';

@Component({
  selector: 'bp-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  imports: [
    FontAwesomeModule
  ]
})
export class DialogComponent {
  private readonly dialogService = inject(DialogService);
  private readonly renderer = inject(Renderer2);

  dialogElement = viewChild.required<ElementRef>('dialog');
  dialogContentWrapperElement = viewChild.required<ElementRef>('dialogContentWrapper');
  dialogContentElement = viewChild.required<ElementRef>('dialogContent');
  dialogTitleElement = viewChild.required<ElementRef>('dialogTitle') ;

  faTimes = faTimes

  @HostListener('document:click', ['$event'])
  clickOut(event: MouseEvent) {
    if (!this.dialogContentWrapperElement().nativeElement.contains(event.target)) {
      this.close();
    }
  }

  constructor() {
    effect(() => {
      const config = this.dialogService.show();

      if (config) {
        this.showModal(config);
      }
    });
  }

  private setContent(content: string) {
    this.setInnerHtml(this.dialogContentElement(), content);
  }

  private setInnerHtml(element: ElementRef, content: string) {
    this.renderer.setProperty(element.nativeElement, 'innerHTML', content);
  }

  private setTitle(title: string) {
    this.setInnerHtml(this.dialogTitleElement(), title);
  }

  private showModal(config: IDialogConfig) {
    if (this.dialogElement) {
      this.setContent(config.content);
      if (config.title) {
        this.setTitle(config.title);
      }
      this.dialogElement().nativeElement.showModal();
    }
  }

  close() {
    if (this.dialogElement().nativeElement.close) {
      this.dialogElement().nativeElement.close();
    }
  }
}
