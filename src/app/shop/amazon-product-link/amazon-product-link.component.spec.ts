import { waitForAsync } from '@angular/core/testing';
import { Shallow } from 'shallow-render';
import { ShopModule } from '../shop.module';

import { AmazonProductLinkComponent } from './amazon-product-link.component';

describe('AmazonProductLinkComponent', () => {
  let shallow: Shallow<AmazonProductLinkComponent>;

  beforeEach(waitForAsync(() => {
    shallow = new Shallow(AmazonProductLinkComponent, ShopModule);
  }));

  it('should create', async () => {
    const { element } = await shallow.render();

    expect(element.nativeElement).toBeTruthy();
  });
});
