import { waitForAsync } from '@angular/core/testing';
import { RouterModule, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Shallow } from 'shallow-render';

import { ProductTypeComponent } from './product-type.component';
import { ShopModule } from '../shop.module';

const routes: Routes = [];

describe('ProductTypeComponent', () => {
  let shallow: Shallow<ProductTypeComponent>;

  beforeEach(waitForAsync(() => {
    shallow = new Shallow(ProductTypeComponent, ShopModule)
      .replaceModule(RouterModule, RouterTestingModule.withRoutes(routes));
  }));

  it('should create', async () => {
    const { element } = await shallow.render();

    expect(element.nativeElement).toBeTruthy();
  });
});

