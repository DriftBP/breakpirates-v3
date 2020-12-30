import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CarouselModule } from 'ngx-bootstrap/carousel';

import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ScheduleModule } from '../schedule/schedule.module';

@NgModule({
  imports: [
    CarouselModule.forRoot(),
    CommonModule,
    RouterModule,
    SharedModule,
    HomeRoutingModule,
    ScheduleModule
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
