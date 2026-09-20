import { ChangeDetectionStrategy, Component, DOCUMENT, Renderer2, AfterViewInit, inject, input } from '@angular/core';

import { AppSettings } from '../../app-settings';

@Component({
    selector: 'bp-ad-unit',
    templateUrl: './ad-unit.component.html',
    styleUrls: ['./ad-unit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdUnitComponent implements AfterViewInit {
  adSlot = input.required<number>();

  adsenseClient = AppSettings.ADSENSE_CLIENT;

  private readonly document = inject<Document>(DOCUMENT);
  private readonly renderer = inject(Renderer2);

  private static adsenseScriptPromise?: Promise<void>;

  ngAfterViewInit(): void {
    void this.initializeAdsense();
  }

  private async initializeAdsense(): Promise<void> {
    await AdUnitComponent.loadAdsenseScript(this.document, this.renderer);

    const adsbygoogle = ((window as Window & { adsbygoogle?: unknown[] }).adsbygoogle ??= []);
    adsbygoogle.push({});
  }

  private static loadAdsenseScript(document: Document, renderer: Renderer2): Promise<void> {
    if (!this.adsenseScriptPromise) {
      this.adsenseScriptPromise = new Promise<void>((resolve, reject) => {
        const script = renderer.createElement('script');
        script.async = true;
        script.crossOrigin = 'anonymous';
        script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${AppSettings.ADSENSE_CLIENT}`;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Failed to load Google AdSense'));
        renderer.appendChild(document.body, script);
      });
    }

    return this.adsenseScriptPromise;
  }
}
