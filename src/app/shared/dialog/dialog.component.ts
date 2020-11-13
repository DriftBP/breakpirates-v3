import { Component, ElementRef, HostListener, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';

import { IDialogConfig } from '../services/dialog/dialog-config';
import { DialogService } from '../services/dialog/dialog.service';

@Component({
  selector: 'bp-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit, OnDestroy {
  @ViewChild('dialog') dialogElement: ElementRef;
  @ViewChild('dialogContentWrapper') dialogContentWrapperElement: ElementRef;
  @ViewChild('dialogContent') dialogContentElement: ElementRef;
  @ViewChild('dialogTitle') dialogTitleElement: ElementRef;

  private showSubscription: Subscription;

  @HostListener('document:click', ['$event'])
  clickOut(event: MouseEvent) {
    if (!this.dialogContentWrapperElement.nativeElement.contains(event.target)) {
      this.close();
    }
  }

  constructor(
    private readonly dialogService: DialogService,
    private readonly renderer: Renderer2
  ) { }

  private setContent(content: string) {
    this.setInnerHtml(this.dialogContentElement, content);
  }

  private setInnerHtml(element: ElementRef, content: string) {
    this.renderer.setProperty(element.nativeElement, 'innerHTML', content);
  }

  private setTitle(title: string) {
    this.setInnerHtml(this.dialogTitleElement, title);
  }

  private showModal(config: IDialogConfig) {
    if (this.dialogElement) {
      this.setContent(config.content);
      if (config.title) {
        this.setTitle(config.title);
      }
      this.dialogElement.nativeElement.showModal();
    }
  }

  ngOnInit(): void {
    this.showSubscription = this.dialogService.show.subscribe(config => {
      this.showModal(config);
    });
  }

  close() {
    this.dialogElement.nativeElement.close();
  }

  ngOnDestroy() {
    if (this.showSubscription) {
      this.showSubscription.unsubscribe();
    }
  }

}
