import { Routes } from '@angular/router';

import { ToolsComponent } from './tools.component';

export const routes: Routes = [
  { path: '', component: ToolsComponent, pathMatch: 'full' },
  { path: 'bpm', loadComponent: () => import('./bpm/bpm.component') },
  { path: 'dj-name', loadComponent: () => import('./dj-name/dj-name.component') },
  { path: 'roster', loadComponent: () => import('./roster/roster.component') },
  { path: 'soundboard', loadChildren: () => import('./soundboard/soundboard.routes').then(m => m.routes) },
];
