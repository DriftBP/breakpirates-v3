import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'radio', pathMatch: 'full' },
  { path: 'radio', loadChildren: './home/home.module#HomeModule' },
  { path: 'news', loadChildren: './news/news.module#NewsModule' },
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
