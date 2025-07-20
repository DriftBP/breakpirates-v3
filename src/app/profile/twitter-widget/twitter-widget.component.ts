import { Component, Renderer2, ChangeDetectionStrategy, input, Signal, computed, DOCUMENT, inject } from '@angular/core';


@Component({
    selector: 'bp-twitter-widget',
    templateUrl: './twitter-widget.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TwitterWidgetComponent {
  private renderer2 = inject(Renderer2);
  private _document = inject<Document>(DOCUMENT);

  user = input.required<string>();

  twitterWidgetUrl: Signal<string>;

  constructor() {
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
