import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NowPlayingComponent } from './now-playing.component';
import { DonateComponent } from './donate.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [NowPlayingComponent, DonateComponent],
  exports: [NowPlayingComponent, DonateComponent]
})
export class SharedModule { }
