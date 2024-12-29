import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ScheduleModule } from '../schedule/schedule.module';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        SharedModule,
        HomeRoutingModule,
        ScheduleModule,
        HomeComponent
    ]
})
export class HomeModule { }
