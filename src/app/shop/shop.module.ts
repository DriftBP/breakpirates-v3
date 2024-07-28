import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopRoutingModule } from '../shop/shop-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AmazonProductLinkComponent } from './amazon-product-link/amazon-product-link.component';
import { ShopService } from './services/shop.service';
import { ProductListingComponent } from './product-listing/product-listing.component';
import { ProductTypeComponent } from './product-type/product-type.component';

@NgModule({
  imports: [
    CommonModule,
    ShopRoutingModule,
    SharedModule
  ],
  declarations: [
    AmazonProductLinkComponent,
    ProductListingComponent,
    ProductTypeComponent
  ],
  providers: [
    ShopService
  ]
})
export class ShopModule { }
