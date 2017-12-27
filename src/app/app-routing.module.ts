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
import { NewsResolve } from './news/news.resolve';

const routes: Routes = [
  { path: '', redirectTo: 'radio', pathMatch: 'full' },
  { path: 'radio', component: HomeComponent },
  { path: 'news', component: NewsComponent, resolve: { news: NewsResolve } },
  { path: 'music', component: MusicComponent },
  { path: 'schedule', component: ScheduleComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'mobile', component: MobileComponent },
  { path: 'video', component: VideoComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule { }
