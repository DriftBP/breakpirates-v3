import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReleasesComponent } from './releases.component';
import { ReleasesRoutingModule } from './releases-routing.module';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    ReleasesRoutingModule,
    SharedModule
  ],
  declarations: [
    ReleasesComponent
  ]
})
export class ReleasesModule { }
