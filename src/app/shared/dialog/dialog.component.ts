import { Component, ElementRef, HostListener, OnDestroy, Renderer2, viewChild } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';

import { IDialogConfig } from '../services/dialog/dialog-config';
import { DialogService } from '../services/dialog/dialog.service';

@Component({
  selector: 'bp-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnDestroy {
  dialogElement = viewChild.required<ElementRef>('dialog');
  dialogContentWrapperElement = viewChild.required<ElementRef>('dialogContentWrapper');
  dialogContentElement = viewChild.required<ElementRef>('dialogContent');
  dialogTitleElement = viewChild.required<ElementRef>('dialogTitle') ;

  private showSubscription?: Subscription;

  faTimes = faTimes

  @HostListener('document:click', ['$event'])
  clickOut(event: MouseEvent) {
    if (!this.dialogContentWrapperElement().nativeElement.contains(event.target)) {
      this.close();
    }
  }

  constructor(
    private readonly dialogService: DialogService,
    private readonly renderer: Renderer2
  ) {
    this.showSubscription = this.dialogService.show.subscribe(config => {
      this.showModal(config);
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

  ngOnDestroy() {
    if (this.showSubscription) {
      this.showSubscription.unsubscribe();
    }
  }

}
