import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'bp-mixcloud-widget',
  templateUrl: './mixcloud-widget.component.html'
})
export class MixcloudWidgetComponent implements OnChanges {
  @Input() user: string;

  mixcloudWidgetUrl: string;

  ngOnChanges(): void {
    this.mixcloudWidgetUrl = 'https://www.mixcloud.com/widget/follow/?u=%2F' + this.user + '%2F';
  }

}
