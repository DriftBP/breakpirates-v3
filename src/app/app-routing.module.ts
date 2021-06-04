import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'radio', pathMatch: 'full' },
  { path: 'radio', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'news', loadChildren: () => import('./news/news.module').then(m => m.NewsModule) },
  { path: 'music', loadChildren: () => import('./music/music.module').then(m => m.MusicModule) },
  { path: 'schedule', loadChildren: () => import('./schedule/schedule.module').then(m => m.ScheduleModule) },
  { path: 'profiles', loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule) },
  { path: 'video', loadChildren: () => import('./video/video.module').then(m => m.VideoModule) },
  { path: 'social', loadChildren: () => import('./social/social.module').then(m => m.SocialModule) },
  { path: 'shop', loadChildren: () => import('./shop/shop.module').then(m => m.ShopModule) },
  { path: 'tools', loadChildren: () => import('./tools/tools.module').then(m => m.ToolsModule) },
  { path: '', component: SidebarComponent, outlet: 'sidebar' },
  { path: '**', component: NotFoundComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', relativeLinkResolution: 'legacy' })
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
