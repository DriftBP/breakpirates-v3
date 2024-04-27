import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ProductType } from '../models/product-type';

import { ProductTypeModel } from '../models/product-type-model';

@Component({
  selector: 'bp-product-type-select',
  templateUrl: './product-type-select.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductTypeSelectComponent {
  types = input.required<ProductTypeModel[]>();
  activeType = input.required<ProductType>();
}
