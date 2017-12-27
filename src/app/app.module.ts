import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { SharedModule } from './shared/shared.module';
import { HomeModule }      from './home/home.module';
import { NewsModule }      from './news/news.module';
import { MusicModule }      from './music/music.module';
import { ScheduleModule } from './schedule/schedule.module';
import { ProfileModule } from './profile/profile.module';
import { MobileModule } from './mobile/mobile.module';
import { VideoModule } from './video/video.module';
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
    HomeModule,
    NewsModule,
    MusicModule,
    ScheduleModule,
    ProfileModule,
    MobileModule,
    VideoModule,
    HttpClientModule
  ],
  providers: [ScheduleService, TuneInService],
  bootstrap: [AppComponent]
})
export class AppModule { }
