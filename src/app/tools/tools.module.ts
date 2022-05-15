import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { ToolsRoutingModule } from './tools-routing.module';
import { ToolsComponent } from './tools.component';

@NgModule({
  imports: [
    CommonModule,
    ToolsRoutingModule,
    SharedModule
  ],
  declarations: [
    ToolsComponent
  ]
})
export class ToolsModule { }
