import { Shallow } from 'shallow-render';

import { ShopService } from './shop.service';
import { ShopModule } from '../shop.module';

describe('ShopService', () => {
  let shallow: Shallow<ShopService>;

  beforeEach(() => {
    shallow = new Shallow(ShopService, ShopModule);
  });

  it('should be created', () => {
    const {instance} = shallow.createService();
    expect(instance).toBeTruthy();
  });
});
