import { ChangeDetectionStrategy, Component, Signal, computed, input, inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
    selector: 'bp-mixcloud-widget',
    templateUrl: './mixcloud-widget.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MixcloudWidgetComponent {
  private readonly sanitizer = inject(DomSanitizer);

  user = input.required<string>();

  mixcloudWidgetUrl: Signal<SafeResourceUrl>;

  constructor() {
    this.mixcloudWidgetUrl = computed(() => {
      const url = `https://www.mixcloud.com/widget/follow/?u=%2F${this.user()}%2F`;

      return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    });
  }

}
