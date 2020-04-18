import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuneInComponent } from './tune-in.component';
import { TuneInService } from './tune-in.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [TuneInComponent],
  providers: [
    TuneInService
  ]
})
export class TuneInModule { }
