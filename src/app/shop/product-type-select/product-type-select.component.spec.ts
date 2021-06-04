import { waitForAsync } from '@angular/core/testing';
import { Shallow } from 'shallow-render';

import { ProductTypeSelectComponent } from './product-type-select.component';
import { ShopModule } from '../shop.module';

describe('ProductTypeSelectComponent', () => {
  let shallow: Shallow<ProductTypeSelectComponent>;

  beforeEach(waitForAsync(() => {
    shallow = new Shallow(ProductTypeSelectComponent, ShopModule);
  }));

  it('should create', async () => {
    const { element } = await shallow.render();

    expect(element.nativeElement).toBeTruthy();
  });
});
