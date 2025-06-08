import { Routes } from '@angular/router';

import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { PageTemplateComponent } from './page-template.component';

export const routes: Routes = [
  { path: 'player', loadChildren: () => import('./standalone-player/standalone-player.routes').then(m => m.routes) },
  { path: '', component: PageTemplateComponent, children: [
    { path: '', redirectTo: 'radio', pathMatch: 'full' },
    { path: 'radio', loadChildren: () => import('./home/home.routes').then(m => m.routes) },
    { path: 'news', loadChildren: () => import('./news/news.routes').then(m => m.routes) },
    { path: 'music', loadChildren: () => import('./music/music.routes').then(m => m.routes) },
    { path: 'schedule', loadChildren: () => import('./schedule/schedule.routes').then(m => m.routes) },
    { path: 'profiles', loadChildren: () => import('./profile/profile.routes').then(m => m.routes) },
    { path: 'video', loadChildren: () => import('./video/video.routes').then(m => m.routes) },
    { path: 'social', loadChildren: () => import('./social/social.routes').then(m => m.routes) },
    { path: 'tools', loadChildren: () => import('./tools/tools.routes').then(m => m.routes) },
    { path: '', component: SidebarComponent, outlet: 'sidebar' },
    { path: '**', component: NotFoundComponent }
  ] }
];
