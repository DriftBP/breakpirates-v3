import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MusicComponent } from './music.component';
import { ScheduleModule } from '../schedule/schedule.module';
import { MusicRoutingModule } from './music-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MusicRoutingModule,
    ScheduleModule
  ],
  declarations: [MusicComponent]
})
export class MusicModule { }
