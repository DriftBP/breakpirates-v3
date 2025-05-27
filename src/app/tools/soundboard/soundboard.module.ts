import { NgModule } from '@angular/core';

import { SoundboardRoutingModule } from './soundboard-routing.module';
import { SoundboardService } from './soundboard.service';

@NgModule({
  imports: [
    SoundboardRoutingModule,
  ],
  providers: [
    SoundboardService
  ]
})
export class SoundboardModule { }
