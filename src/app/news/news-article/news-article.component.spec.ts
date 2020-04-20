import { async } from '@angular/core/testing';
import { Shallow } from 'shallow-render';

import { NewsArticleComponent } from './news-article.component';
import { NewsModule } from '../news.module';
import { RouterModule, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

const routes: Routes = [];

describe('NewsArticleComponent', () => {
  let shallow: Shallow<NewsArticleComponent>;

  beforeEach(async(() => {
    shallow = new Shallow(NewsArticleComponent, NewsModule)
      .replaceModule(RouterModule, RouterTestingModule.withRoutes(routes));
  }));

  it('should create', async () => {
    const { element } = await shallow.render();

    expect(element.nativeElement).toBeTruthy();
  });
});

