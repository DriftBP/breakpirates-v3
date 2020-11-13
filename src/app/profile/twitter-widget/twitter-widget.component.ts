import { Component, OnChanges, Input, Renderer2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'bp-twitter-widget',
  templateUrl: './twitter-widget.component.html'
})
export class TwitterWidgetComponent implements OnChanges {
  @Input() user: string;

  twitterWidgetUrl: string;

  constructor(
    private _renderer2: Renderer2,
    @Inject(DOCUMENT) private _document: Document
  ) {
    const script = this._renderer2.createElement('script');
    script.async = 'async';
    script.src = 'https://platform.twitter.com/widgets.js';
    script.charset = 'utf-8';

    this._renderer2.appendChild(this._document.body, script);
  }

  ngOnChanges(): void {
    this.twitterWidgetUrl = 'https://twitter.com/' + this.user + '?ref_src=twsrc%5Etfw';
  }

}
