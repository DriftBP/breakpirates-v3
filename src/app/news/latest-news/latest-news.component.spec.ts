import { async } from '@angular/core/testing';
import { Shallow } from 'shallow-render';
import { RouterModule, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { LatestNewsComponent } from './latest-news.component';
import { NewsModule } from '../news.module';
import { NewsService } from '../news.service';
import { News } from '../news';

const routes: Routes = [];
const mockNews: News = {
  id: 1,
  title: 'title',
  text: 'text',
  summary: 'summary',
  image: 'image.png'
};

describe('LatestNewsComponent', () => {
  let shallow: Shallow<LatestNewsComponent>;

  beforeEach(async(() => {
    shallow = new Shallow(LatestNewsComponent, NewsModule)
      .replaceModule(RouterModule, RouterTestingModule.withRoutes(routes))
      .mock(NewsService, {
          latestNews: () => of([ mockNews ])
        });
  }));

  it('should create', async () => {
    const { element } = await shallow.render();

    expect(element.nativeElement).toBeTruthy();
  });

  it('should have at least one article', async () => {
    const { instance } = await shallow.render();

    expect(instance.latestNews.length).toBeGreaterThan(0);
  });
});
