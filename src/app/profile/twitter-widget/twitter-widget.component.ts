import { Component, OnChanges, Input, Renderer2, Inject, ChangeDetectionStrategy } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'bp-twitter-widget',
  templateUrl: './twitter-widget.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TwitterWidgetComponent implements OnChanges {
  @Input({ required: true }) user: string;

  twitterWidgetUrl: string;

  constructor(
    private renderer2: Renderer2,
    @Inject(DOCUMENT) private _document: Document
  ) {
    const script = this.renderer2.createElement('script');
    script.async = 'async';
    script.src = 'https://platform.twitter.com/widgets.js';
    script.charset = 'utf-8';

    this.renderer2.appendChild(this._document.body, script);
  }

  ngOnChanges(): void {
    this.twitterWidgetUrl = `https://twitter.com/${this.user}?ref_src=twsrc%5Etfw`;
  }

}
