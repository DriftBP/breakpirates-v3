import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductTypeComponent } from './product-type/product-type.component';
import { DefaultProductTypeResolve } from './resolves/default-product-type.resolve';
import { ProductTypeResolve } from './resolves/product-type.resolve';
import { ShopResolvesModule } from './resolves/shop-resolves.module';
import { TypesResolve } from './resolves/types.resolve';
import { ShopComponent } from './shop.component';

const routes: Routes = [
  { path: '', component: ShopComponent, resolve: { types: TypesResolve }, children: [
    { path: '', component: ProductTypeComponent, resolve: { products: DefaultProductTypeResolve } },
    { path: ':type', component: ProductTypeComponent, resolve: { products: ProductTypeResolve } }
  ] }
];

@NgModule({
  imports: [
    ShopResolvesModule,
    RouterModule.forChild(routes)]
  ,
  exports: [RouterModule]
})
export class ShopRoutingModule { }
