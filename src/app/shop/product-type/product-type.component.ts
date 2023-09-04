import { Component, Input } from '@angular/core';

@Component({
  selector: 'bp-product-type',
  templateUrl: './product-type.component.html'
})
export class ProductTypeComponent {
  @Input() products: string[];
}
