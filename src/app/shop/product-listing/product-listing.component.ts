import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'bp-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListingComponent {
  products = input.required<string[]>();
}
