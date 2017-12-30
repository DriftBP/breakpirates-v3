import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { NewsComponent } from './news/news.component';
import { MusicComponent } from './music/music.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { ProfileComponent } from './profile/profile.component';
import { MobileComponent } from './mobile/mobile.component';
import { VideoComponent } from './video/video.component';
import { NewsArticleComponent } from './news/news-article/news-article.component';
import { VideoDetailsComponent } from './video/video-details/video-details.component';

import { NewsResolve } from './news/news.resolve';
import { NewsArticleResolve } from './news/news-article.resolve';
import { VideoResolve } from './video/video.resolve';
import { VideoDetailResolve } from './video/video-detail.resolve';

const routes: Routes = [
  { path: '', redirectTo: 'radio', pathMatch: 'full' },
  { path: 'radio', component: HomeComponent },
  { path: 'news', component: NewsComponent, resolve: { news: NewsResolve }, pathMatch: 'full' },
  { path: 'news/:id', component: NewsArticleComponent, resolve: { article: NewsArticleResolve } },
  { path: 'music', component: MusicComponent },
  { path: 'schedule', component: ScheduleComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'mobile', component: MobileComponent },
  { path: 'video', component: VideoComponent, resolve: { videos: VideoResolve }, pathMatch: 'full' },
  { path: 'video/:id', component: VideoDetailsComponent, resolve: { video: VideoDetailResolve } },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
