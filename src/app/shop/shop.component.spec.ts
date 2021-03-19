import { waitForAsync } from '@angular/core/testing';
import { Shallow } from 'shallow-render';

import { ShopComponent } from './shop.component';
import { ShopModule } from './shop.module';

describe('ShopComponent', () => {
  let shallow: Shallow<ShopComponent>;

  beforeEach(waitForAsync(() => {
    shallow = new Shallow(ShopComponent, ShopModule);
  }));

  it('should create', async () => {
    const { element } = await shallow.render();

    expect(element.nativeElement).toBeTruthy();
  });
});
