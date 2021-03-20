import { waitForAsync } from '@angular/core/testing';
import { Shallow } from 'shallow-render';

import { AmazonProductLinkComponent } from './amazon-product-link.component';
import { ShopModule } from '../shop.module';

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
