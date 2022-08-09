import { waitForAsync } from '@angular/core/testing';
import { Shallow } from 'shallow-render/dist/lib/shallow';

import { ProductListingComponent } from './product-listing.component';
import { ShopModule } from '../shop.module';

describe('ProductListingComponent', () => {
  let shallow: Shallow<ProductListingComponent>;

  beforeEach(waitForAsync(() => {
    shallow = new Shallow(ProductListingComponent, ShopModule);
  }));

  it('should create', async () => {
    const { element } = await shallow.render();

    expect(element.nativeElement).toBeTruthy();
  });
});

