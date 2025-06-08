import { Routes } from '@angular/router';

import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { PageTemplateComponent } from './page-template.component';

export const routes: Routes = [
  { path: 'player', loadChildren: () => import('./standalone-player/standalone-player.module').then(m => m.StandalonePlayerModule) },
  { path: '', component: PageTemplateComponent, children: [
    { path: '', redirectTo: 'radio', pathMatch: 'full' },
    { path: 'radio', loadChildren: () => import('./home/home.routes').then(m => m.routes) },
    { path: 'news', loadChildren: () => import('./news/news.routes').then(m => m.routes) },
    { path: 'music', loadChildren: () => import('./music/music.routes').then(m => m.routes) },
    { path: 'schedule', loadChildren: () => import('./schedule/schedule.module').then(m => m.ScheduleModule) },
    { path: 'profiles', loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule) },
    { path: 'video', loadChildren: () => import('./video/video.module').then(m => m.VideoModule) },
    { path: 'social', loadChildren: () => import('./social/social.module').then(m => m.SocialModule) },
    { path: 'tools', loadChildren: () => import('./tools/tools.module').then(m => m.ToolsModule) },
    { path: '', component: SidebarComponent, outlet: 'sidebar' },
    { path: '**', component: NotFoundComponent }
  ] }
];
