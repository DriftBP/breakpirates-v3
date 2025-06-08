import { Routes } from '@angular/router';

import { ToolsComponent } from './tools.component';

export const routes: Routes = [
  { path: '', component: ToolsComponent, pathMatch: 'full' },
  { path: 'bpm', loadComponent: () => import('./bpm/bpm.component').then(m => m.BpmComponent) },
  { path: 'dj-name', loadComponent: () => import('./dj-name/dj-name.component').then(m => m.DjNameComponent) },
  { path: 'roster', loadComponent: () => import('./roster/roster.component').then(m => m.RosterComponent) },
  { path: 'soundboard', loadChildren: () => import('./soundboard/soundboard.routes').then(m => m.routes) },
];
