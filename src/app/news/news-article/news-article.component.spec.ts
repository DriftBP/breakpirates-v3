import { waitForAsync } from '@angular/core/testing';
import { Shallow } from 'shallow-render/dist/lib/shallow';
import { RouterModule, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { NewsArticleComponent } from './news-article.component';
import { NewsModule } from '../news.module';

const routes: Routes = [];

describe('NewsArticleComponent', () => {
  let shallow: Shallow<NewsArticleComponent>;

  beforeEach(waitForAsync(() => {
    shallow = new Shallow(NewsArticleComponent, NewsModule)
      .replaceModule(RouterModule, RouterTestingModule.withRoutes(routes));
  }));

  it('should create', async () => {
    const { element } = await shallow.render();

    expect(element.nativeElement).toBeTruthy();
  });
});

