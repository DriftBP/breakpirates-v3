import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { NewsComponent } from './news/news.component';
import { ProfilesComponent } from './profile/profiles.component';
import { HostDetailsComponent } from './profile/host-details/host-details.component';
import { MobileComponent } from './mobile/mobile.component';
import { VideoComponent } from './video/video.component';
import { NewsArticleComponent } from './news/news-article/news-article.component';
import { VideoDetailsComponent } from './video/video-details/video-details.component';

import { NewsResolve } from './news/news.resolve';
import { NewsArticleResolve } from './news/news-article.resolve';
import { ProfilesResolve } from './profile/profiles.resolve';
import { HostDetailsResolve } from './profile/host-details.resolve';
import { VideoResolve } from './video/video.resolve';
import { VideoDetailResolve } from './video/video-detail.resolve';

const routes: Routes = [
  { path: '', redirectTo: 'radio', pathMatch: 'full' },
  { path: 'radio', loadChildren: './home/home.module#HomeModule' },
  { path: 'news', component: NewsComponent, resolve: { news: NewsResolve }, pathMatch: 'full' },
  { path: 'news/:id', component: NewsArticleComponent, resolve: { article: NewsArticleResolve } },
  { path: 'music', loadChildren: './music/music.module#MusicModule' },
  { path: 'schedule', loadChildren: './schedule/schedule.module#ScheduleModule' },
  { path: 'profile', component: ProfilesComponent, resolve: { profiles: ProfilesResolve }, pathMatch: 'full' },
  { path: 'profile/:id', component: HostDetailsComponent, resolve: { profile: HostDetailsResolve } },
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
