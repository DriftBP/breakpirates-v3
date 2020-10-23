import { waitForAsync } from '@angular/core/testing';
import { Shallow } from 'shallow-render';

import { FeaturedNewsComponent } from './featured-news.component';
import { NewsModule } from '../news.module';
import { News } from '../news';

const mockArticle: News = {
  id: 1,
  date: 1,
  title: 'Article title',
  text: 'Article text',
  summary: 'Article summary',
  image: 'article.jpg',
  added_by: 'BP'
};

describe('FeaturedNewsComponent', () => {
  let shallow: Shallow<FeaturedNewsComponent>;

  beforeEach(waitForAsync(() => {
    shallow = new Shallow(FeaturedNewsComponent, NewsModule);
  }));

  it('should create', async () => {
    const { element } = await shallow.render();

    expect(element.nativeElement).toBeTruthy();
  });

  it('should populate the template', async () => {
    const { fixture, find } = await shallow.render({bind: {article: mockArticle}});

    fixture.detectChanges();

    const title = find('.featured-news__title');
    const paragraph = find('.featured-news__summary');

    expect(title.length).toEqual(1);
    expect(title.nativeElement.innerHTML).toEqual(mockArticle.title);
    expect(paragraph.length).toEqual(1);
    expect(paragraph.nativeElement.innerHTML).toEqual(mockArticle.summary);
  });
});

