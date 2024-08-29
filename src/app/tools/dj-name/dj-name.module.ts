import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

import { DjNameComponent } from './dj-name.component';
import { DjNameRoutingModule } from './dj-name-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { DjNameService } from './services/dj-name.service';

@NgModule({
  imports: [
    CommonModule,
    DjNameRoutingModule,
    SharedModule,
    NgOptimizedImage
  ],
  declarations: [
    DjNameComponent
  ],
  providers: [
    DjNameService
  ]
})
export class DjNameModule { }
