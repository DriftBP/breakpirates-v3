import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { StandalonePlayerComponent } from './standalone-player.component';
import { StandalonePlayerRoutingModule } from './standalone-player-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ScheduleModule } from '../schedule/schedule.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    StandalonePlayerRoutingModule,
    ScheduleModule
  ],
  declarations: [StandalonePlayerComponent]
})
export class StandalonePlayerModule { }
