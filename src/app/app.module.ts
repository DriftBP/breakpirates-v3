import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { SharedModule } from './shared/shared.module';
import { ScheduleModule } from './schedule/schedule.module';
import { NewsService } from './news/news.service';
import { ScheduleService } from './schedule/schedule.service';
import { TuneInService } from './tune-in/tune-in.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    ScheduleModule,
    HttpClientModule
  ],
  providers: [
    NewsService,
    ScheduleService,
    TuneInService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
