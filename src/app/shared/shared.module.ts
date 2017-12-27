import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NowPlaying } from './now-playing.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [NowPlaying],
  exports: [NowPlaying]
})
export class SharedModule { }
