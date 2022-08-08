import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BpmComponent } from './bpm.component';
import { BpmRoutingModule } from './bpm-routing.module';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    BpmRoutingModule,
    SharedModule
  ],
  declarations: [
    BpmComponent
  ]
})
export class BpmModule { }
