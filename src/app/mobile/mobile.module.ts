import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MobileComponent } from './mobile.component';
import { MobileRoutingModule } from './mobile-routing.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MobileRoutingModule
  ],
  declarations: [MobileComponent]
})
export class MobileModule { }
