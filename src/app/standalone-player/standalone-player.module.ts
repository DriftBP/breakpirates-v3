import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { StandalonePlayerComponent } from './standalone-player.component';
import { StandalonePlayerRoutingModule } from './standalone-player-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    StandalonePlayerRoutingModule,
    FontAwesomeModule,
    NgOptimizedImage,
    StandalonePlayerComponent
  ]
})
export class StandalonePlayerModule { }
