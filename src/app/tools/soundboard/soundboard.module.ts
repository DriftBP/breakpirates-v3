import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SoundboardComponent } from './soundboard.component';
import { SoundboardRoutingModule } from './soundboard-routing.module';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    SoundboardRoutingModule,
    SharedModule
  ],
  declarations: [
    SoundboardComponent
  ]
})
export class SoundboardModule { }
