import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { NewsModule } from '../news/news.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NewsModule
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
