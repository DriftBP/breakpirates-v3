import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ToolsComponent } from './tools.component';

const routes: Routes = [
  { path: '', component: ToolsComponent, pathMatch: 'full' },
  { path: 'bpm', loadChildren: () => import('./bpm/bpm.module').then(m => m.BpmModule) },
  { path: 'dj-name', loadComponent: () => import('./dj-name/dj-name.component').then(m => m.DjNameComponent) },
  { path: 'releases', loadComponent: () => import('./releases/releases.component').then(m => m.ReleasesComponent) },
  { path: 'soundboard', loadChildren: () => import('./soundboard/soundboard.module').then(m => m.SoundboardModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ToolsRoutingModule { }
