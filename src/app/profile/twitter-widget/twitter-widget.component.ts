import { Component, Renderer2, Inject, ChangeDetectionStrategy, input, Signal, computed } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
    selector: 'bp-twitter-widget',
    templateUrl: './twitter-widget.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class TwitterWidgetComponent {
  user = input.required<string>();

  twitterWidgetUrl: Signal<string>;

  constructor(
    private renderer2: Renderer2,
    @Inject(DOCUMENT) private _document: Document
  ) {
    const script = this.renderer2.createElement('script');
    script.async = 'async';
    script.src = 'https://platform.twitter.com/widgets.js';
    script.charset = 'utf-8';

    this.renderer2.appendChild(this._document.body, script);

    this.twitterWidgetUrl = computed(() => {
      return `https://twitter.com/${this.user()}?ref_src=twsrc%5Etfw`;
    });
  }

}
