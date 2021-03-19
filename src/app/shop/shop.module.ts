import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopComponent } from './/shop.component';
import { ShopRoutingModule } from '../shop/shop-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AmazonProductLinkComponent } from './amazon-product-link/amazon-product-link.component';
import { ShopService } from './services/shop.service';

@NgModule({
  imports: [
    CommonModule,
    ShopRoutingModule,
    SharedModule
  ],
  declarations: [
    ShopComponent,
    AmazonProductLinkComponent
  ],
  providers: [
    ShopService
  ]
})
export class ShopModule { }
