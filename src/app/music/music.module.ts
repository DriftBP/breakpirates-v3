import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MusicComponent } from './music.component';
import { GenreComponent } from './genre/genre.component';
import { ScheduleModule } from '../schedule/schedule.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ScheduleModule
  ],
  declarations: [MusicComponent, GenreComponent]
})
export class MusicModule { }
