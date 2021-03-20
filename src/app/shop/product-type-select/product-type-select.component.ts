import { Component, Input } from '@angular/core';
import { ProductType } from '../models/product-type';

import { ProductTypeModel } from '../models/product-type-model';

@Component({
  selector: 'bp-product-type-select',
  templateUrl: './product-type-select.component.html'
})
export class ProductTypeSelectComponent {
  @Input() types: ProductTypeModel[];
  @Input() activeType: ProductType;
}