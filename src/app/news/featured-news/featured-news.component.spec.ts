import { waitForAsync } from '@angular/core/testing';
import { Shallow } from 'shallow-render';

import { FeaturedNewsComponent } from './featured-news.component';
import { NewsModule } from '../news.module';
import { News } from '../models/news';

const mockArticleWithImage: News = {
  id: 1,
  date: '1',
  title: 'Article title',
  text: 'Article text',
  summary: 'Article summary',
  image: 'article.jpg',
  added_by: 'BP'
};

const mockArticleWithoutImage: News = {
  ...mockArticleWithImage,
  image: null
};

const defaultImageFilename = 'bp.jpg';

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
    const { fixture, find } = await shallow.render({bind: {article: mockArticleWithImage}});

    fixture.detectChanges();

    const title = find('.featured-news__title');
    const paragraph = find('.featured-news__summary');

    expect(title.length).toEqual(1);
    expect(title.nativeElement.innerHTML).toEqual(mockArticleWithImage.title);
    expect(paragraph.length).toEqual(1);
    expect(paragraph.nativeElement.innerHTML).toEqual(mockArticleWithImage.summary);
  });

  it('should use default image if not set in article', async () => {
    const { instance } = await shallow.render({bind: {article: mockArticleWithoutImage}});

    expect(instance.imagePath).toContain(defaultImageFilename);
  });

  it('should set hover state true on mouse over', async () => {
    const { instance } = await shallow.render();

    instance.hover = false;
    instance.onMouseOver({});
    expect(instance.hover).toBeTruthy();
  });

  it('should set hover state false on mouse out', async () => {
    const { instance } = await shallow.render();

    instance.hover = true;
    instance.onMouseOut({});
    expect(instance.hover).toBeFalsy();
  });
});

