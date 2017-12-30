import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ScheduleComponent } from './schedule.component';
import { ShowSummaryComponent } from './show-summary/show-summary.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [ScheduleComponent, ShowSummaryComponent],
  exports: [
    ShowSummaryComponent
  ]
})
export class ScheduleModule { }
