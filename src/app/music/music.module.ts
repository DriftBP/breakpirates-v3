import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MusicComponent } from './music.component';
import { GenreComponent } from './genre/genre.component';
import { ScheduleModule } from '../schedule/schedule.module';
import { MusicRoutingModule } from './music-routing.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MusicRoutingModule,
    ScheduleModule
  ],
  declarations: [MusicComponent, GenreComponent]
})
export class MusicModule { }
