import { waitForAsync } from '@angular/core/testing';
import { RouterModule, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Shallow } from 'shallow-render/dist/lib/shallow';

import { ShopComponent } from './shop.component';
import { ShopModule } from './shop.module';

const routes: Routes = [];

describe('ShopComponent', () => {
  let shallow: Shallow<ShopComponent>;

  beforeEach(waitForAsync(() => {
    shallow = new Shallow(ShopComponent, ShopModule)
      .replaceModule(RouterModule, RouterTestingModule.withRoutes(routes));
  }));

  it('should create', async () => {
    const { element } = await shallow.render();

    expect(element.nativeElement).toBeTruthy();
  });
});
