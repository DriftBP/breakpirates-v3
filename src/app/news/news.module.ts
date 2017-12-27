import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NewsComponent } from './news.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [NewsComponent]
})
export class NewsModule { }
