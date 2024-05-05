import { Component, input } from '@angular/core';

@Component({
  selector: 'bp-product-type',
  templateUrl: './product-type.component.html'
})
export class ProductTypeComponent {
  products = input<string[]>();
}
