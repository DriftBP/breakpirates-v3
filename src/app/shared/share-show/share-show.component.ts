import { Component, inject, input, signal } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faShareNodes } from '@fortawesome/free-solid-svg-icons';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

import { Show } from '../../schedule/models/show';

@Component({
  selector: 'bp-share-show',
  templateUrl: './share-show.component.html',
  styleUrls: ['./share-show.component.scss'],
  imports: [
    FontAwesomeModule,
    TranslatePipe
  ]
})
export class ShareShowComponent {
  private readonly translateService = inject(TranslateService);

  show = input.required<Show>();
  faShareNodes = faShareNodes;
  linkCopied = signal(false);

  async shareShow(): Promise<void> {
    const show = this.show();
    const url = window.location.href;
    const shareData = {
      title: show.title,
      text: this.translateService.instant('SCHEDULE.SHARE_TEXT', { title: show.title }),
      url
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return;
        }

        throw error;
      }

      return;
    }

    await navigator.clipboard.writeText(url);
    this.linkCopied.set(true);
    window.setTimeout(() => this.linkCopied.set(false), 2000);
  }
}
