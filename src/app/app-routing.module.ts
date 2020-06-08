import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { PathResolveService } from './path-resolve.service';
import { paths } from './paths';

const routes: Routes = [
  { path: '', redirectTo: 'radio', pathMatch: 'full' },
  { path: paths.radio, loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: paths.news, loadChildren: () => import('./news/news.module').then(m => m.NewsModule) },
  { path: paths.music, loadChildren: () => import('./music/music.module').then(m => m.MusicModule) },
  { path: paths.schedule, loadChildren: () => import('./schedule/schedule.module').then(m => m.ScheduleModule) },
  { path: paths.profiles, loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule) },
  { path: paths.video, loadChildren: () => import('./video/video.module').then(m => m.VideoModule) },
  { path: paths.social, loadChildren: () => import('./social/social.module').then(m => m.SocialModule) },
  { path: paths.tools, loadChildren: () => import('./tools/tools.module').then(m => m.ToolsModule) },
  { path: '', component: SidebarComponent, outlet: 'sidebar' },
  { path: '**', resolve: { path: PathResolveService }, component: NotFoundComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
