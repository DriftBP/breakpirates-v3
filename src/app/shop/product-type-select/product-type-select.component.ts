import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ProductType } from '../models/product-type';

import { ProductTypeModel } from '../models/product-type-model';

@Component({
  selector: 'bp-product-type-select',
  templateUrl: './product-type-select.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductTypeSelectComponent {
  @Input({ required: true }) types: ProductTypeModel[] = [];
  @Input({ required: true }) activeType?: ProductType;
}
