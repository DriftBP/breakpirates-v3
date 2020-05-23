import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BpmComponent } from './bpm/bpm.component';
import { SharedModule } from '../shared/shared.module';
import { ToolsRoutingModule } from './tools-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ToolsRoutingModule,
    SharedModule
  ],
  declarations: [
    BpmComponent
  ]
})
export class ToolsModule { }
