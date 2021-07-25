import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { SoundboardComponent } from './soundboard.component';
import { SoundboardRoutingModule } from './soundboard-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { SampleButtonComponent } from './sample-button/sample-button.component';
import { SoundboardService } from './soundboard.service';

@NgModule({
  imports: [
    CommonModule,
    SoundboardRoutingModule,
    SharedModule,
    FontAwesomeModule
  ],
  declarations: [
    SoundboardComponent,
    SampleButtonComponent
  ],
  providers: [
    SoundboardService
  ]
})
export class SoundboardModule { }
