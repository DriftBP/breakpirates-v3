import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopComponent } from './/shop.component';
import { ShopRoutingModule } from '../shop/shop-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AmazonProductLinkComponent } from './amazon-product-link/amazon-product-link.component';
import { ShopService } from './services/shop.service';
import { ProductListingComponent } from './product-listing/product-listing.component';
import { ProductTypeSelectComponent } from './product-type-select/product-type-select.component';
import { ProductTypeComponent } from './product-type/product-type.component';

@NgModule({
  imports: [
    CommonModule,
    ShopRoutingModule,
    SharedModule
  ],
  declarations: [
    ShopComponent,
    AmazonProductLinkComponent,
    ProductListingComponent,
    ProductTypeSelectComponent,
    ProductTypeComponent
  ],
  providers: [
    ShopService
  ]
})
export class ShopModule { }
