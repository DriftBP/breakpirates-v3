import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { HomeModule }      from './home/home.module';
import { NewsModule }      from './news/news.module';
import { MusicModule }      from './music/music.module';
import { ScheduleModule } from './schedule/schedule.module';
import { ProfileModule } from './profile/profile.module';
import { MobileModule } from './mobile/mobile.module';
import { VideoModule } from './video/video.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    NewsModule,
    MusicModule,
    ScheduleModule,
    ProfileModule,
    MobileModule,
    VideoModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
