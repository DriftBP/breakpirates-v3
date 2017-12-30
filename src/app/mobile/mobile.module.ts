import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MobileComponent } from './mobile.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [MobileComponent]
})
export class MobileModule { }
