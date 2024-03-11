import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'bp-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListingComponent {
  @Input({ required: true }) products: string[] = [];
}
