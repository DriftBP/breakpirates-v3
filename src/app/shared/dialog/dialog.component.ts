import { Component, ElementRef, HostListener, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';

import { DialogService } from '../services/dialog.service';

@Component({
  selector: 'app-dialog',
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

  ngOnInit(): void {
    this.showSubscription = this.dialogService.show.subscribe(config => {
      if (this.dialogElement) {
        this.setContent(config.content);
        if (config.title) {
          this.setTitle(config.title);
        }
        this.dialogElement.nativeElement.showModal();
      }
    });
  }

  close() {
    this.dialogElement.nativeElement.close();
  }

  setContent(content: string) {
    this.renderer.setProperty(this.dialogContentElement.nativeElement, 'innerHTML', content);
  }

  setTitle(title: string) {
    this.renderer.setProperty(this.dialogTitleElement.nativeElement, 'innerHTML', title);
  }

  ngOnDestroy() {
    if (this.showSubscription) {
      this.showSubscription.unsubscribe();
    }
  }

}
