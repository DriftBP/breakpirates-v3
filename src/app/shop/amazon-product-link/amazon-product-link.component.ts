import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { AppSettings } from '../../app-settings';

@Component({
  selector: 'bp-amazon-product-link',
  templateUrl: './amazon-product-link.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AmazonProductLinkComponent implements OnChanges{
  @Input({ required: true }) asin?: string;

  amazonWidgetUrl?: SafeResourceUrl;

  constructor(private readonly sanitizer: DomSanitizer) {}

  ngOnChanges(): void {
    const url = `//ws-eu.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=GB&source=ac&ref=tf_til&ad_type=product_link&tracking_id=${AppSettings.AMAZON_TRACKING_ID}&marketplace=amazon&region=GB&placement=${this.asin}&asins=${this.asin}&linkId=5c46bbed4ac4aa9a033ebc6a5ee6756f&show_border=false&link_opens_in_new_window=true&price_color=333333&title_color=0066c0&bg_color=ffffff`;

    this.amazonWidgetUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
