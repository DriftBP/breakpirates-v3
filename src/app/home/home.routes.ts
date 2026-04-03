import { Routes } from '@angular/router';

import { HomeComponent } from './home.component';
import { NewsService } from '../news/services/news.service';

export const routes: Routes = [
  {
    path: '',
    providers: [
      NewsService
    ],
    component: HomeComponent
  }
];
