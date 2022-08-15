import { waitForAsync } from '@angular/core/testing';
import { Shallow } from 'shallow-render';

import { LatestNewsComponent } from './latest-news.component';
import { NewsModule } from '../news.module';
import { News } from '../models/news';

const mockNews: News = {
  id: 1,
  date: '0',
  title: 'title',
  text: 'text',
  summary: 'summary',
  image: 'image.png',
  added_by: 'BP'
};

describe('LatestNewsComponent', () => {
  let shallow: Shallow<LatestNewsComponent>;

  beforeEach(waitForAsync(() => {
    shallow = new Shallow(LatestNewsComponent, NewsModule);
  }));

  it('should create', async () => {
    const { element } = await shallow.render();

    expect(element.nativeElement).toBeTruthy();
  });

  it('should have at least one article', async () => {
    const { instance } = await shallow.render({bind: {news: [mockNews]}});

    expect(instance.news.length).toBeGreaterThan(0);
  });
});
