import { Component, Input, OnChanges } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'bp-mixcloud-widget',
  templateUrl: './mixcloud-widget.component.html'
})
export class MixcloudWidgetComponent implements OnChanges {
  @Input() user: string;

  mixcloudWidgetUrl: SafeResourceUrl;

  constructor(private readonly sanitizer: DomSanitizer) {}

  ngOnChanges(): void {
    const url = `https://www.mixcloud.com/widget/follow/?u=%2F${this.user}%2F`;

    this.mixcloudWidgetUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
