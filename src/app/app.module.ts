import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { SharedModule } from './shared/shared.module';
import { HomeModule } from './home/home.module';
import { NewsModule } from './news/news.module';
import { MusicModule } from './music/music.module';
import { ScheduleModule } from './schedule/schedule.module';
import { ProfileModule } from './profile/profile.module';
import { MobileModule } from './mobile/mobile.module';
import { VideoModule } from './video/video.module';
import { NewsService } from './news/news.service';
import { MusicService } from './music/music.service';
import { ScheduleService } from './schedule/schedule.service';
import { TuneInService } from './tune-in/tune-in.service';
import { VideoService } from './video/video.service';

import { NewsResolve } from './news/news.resolve';
import { NewsArticleResolve } from './news/news-article.resolve';
import { GenresResolve } from './music/genres.resolve';
import { GenreResolve } from './music/genre.resolve';
import { GenreShowsResolve } from './music/genre-shows.resolve';
import { VideoResolve } from './video/video.resolve';
import { VideoDetailResolve } from './video/video-detail.resolve';
import { ProfilesResolve } from './profile/profiles.resolve';
import { HostDetailsResolve } from './profile/host-details.resolve';
import { ProfileService } from './profile/profile.service';

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
  providers: [
    NewsService,
    NewsResolve,
    NewsArticleResolve,
    MusicService,
    GenresResolve,
    GenreResolve,
    GenreShowsResolve,
    ProfileService,
    ProfilesResolve,
    HostDetailsResolve,
    ScheduleService,
    TuneInService,
    VideoService,
    VideoResolve,
    VideoDetailResolve
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
