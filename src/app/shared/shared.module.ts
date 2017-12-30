import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';

import { NowPlayingComponent } from './now-playing/now-playing.component';
import { DonateComponent } from './donate/donate.component';
import { NavigationComponent } from './navigation/navigation.component';
import { SafePipe } from './safe.pipe';

@NgModule({
  imports: [
    BsDropdownModule.forRoot(),
    CollapseModule.forRoot(),
    CommonModule,
    RouterModule
  ],
  declarations: [NavigationComponent, NowPlayingComponent, DonateComponent, SafePipe],
  exports: [NavigationComponent, NowPlayingComponent, DonateComponent, SafePipe]
})
export class SharedModule { }
