import { Component, Input } from '@angular/core';

@Component({
  selector: 'bp-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.scss']
})
export class ProductListingComponent {
  @Input() products: string[];
}
