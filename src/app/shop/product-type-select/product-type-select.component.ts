import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ProductType } from '../models/product-type';

import { ProductTypeModel } from '../models/product-type-model';
import { ActiveDirective } from '../../shared/directives/active.directive';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'bp-product-type-select',
  templateUrl: './product-type-select.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ActiveDirective,
    TranslateModule,
    RouterModule
  ],
  standalone: true
})
export class ProductTypeSelectComponent {
  types = input.required<ProductTypeModel[]>();
  activeType = input.required<ProductType>();
}
