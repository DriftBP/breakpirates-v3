import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NowPlayingComponent } from './now-playing/now-playing.component';
import { DonateComponent } from './donate/donate.component';
import { NavigationComponent } from './navigation/navigation.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [NavigationComponent, NowPlayingComponent, DonateComponent],
  exports: [NavigationComponent, NowPlayingComponent, DonateComponent]
})
export class SharedModule { }
