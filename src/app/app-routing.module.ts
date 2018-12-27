import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { NewsComponent } from './news/news.component';
import { NewsArticleComponent } from './news/news-article/news-article.component';

import { NewsResolve } from './news/news.resolve';
import { NewsArticleResolve } from './news/news-article.resolve';

const routes: Routes = [
  { path: '', redirectTo: 'radio', pathMatch: 'full' },
  { path: 'radio', loadChildren: './home/home.module#HomeModule' },
  { path: 'news', component: NewsComponent, resolve: { news: NewsResolve }, pathMatch: 'full' },
  { path: 'news/:id', component: NewsArticleComponent, resolve: { article: NewsArticleResolve } },
  { path: 'music', loadChildren: './music/music.module#MusicModule' },
  { path: 'schedule', loadChildren: './schedule/schedule.module#ScheduleModule' },
  { path: 'profile', loadChildren: './profile/profile.module#ProfileModule' },
  { path: 'mobile', loadChildren: './mobile/mobile.module#MobileModule' },
  { path: 'video', loadChildren: './video/video.module#VideoModule' },
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
