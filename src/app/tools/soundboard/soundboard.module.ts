import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { SoundboardRoutingModule } from './soundboard-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { SoundboardService } from './soundboard.service';

@NgModule({
  imports: [
    CommonModule,
    SoundboardRoutingModule,
    SharedModule,
    FontAwesomeModule
  ],
  providers: [
    SoundboardService
  ]
})
export class SoundboardModule { }
