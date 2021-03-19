import { Component, Input, OnInit } from '@angular/core';

import { Product } from '../services/product';

@Component({
  selector: 'bp-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.scss']
})
export class ProductListingComponent {
  @Input() products: Product[];
}
