import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { NewsRoutingModule } from './news-routing.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NewsRoutingModule,
    SharedModule
  ]
})
export class NewsModule { }
