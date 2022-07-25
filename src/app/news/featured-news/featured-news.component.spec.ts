import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

import { FeaturedNewsComponent } from './featured-news.component';
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
  let component: FeaturedNewsComponent;
  let fixture: ComponentFixture<FeaturedNewsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        FeaturedNewsComponent
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeaturedNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', async () => {
    expect(component).toBeDefined();
  });

  describe('mockArticleWithImage', () => {
    beforeEach(() => {
      component.article = mockArticleWithImage;
      fixture.detectChanges();
    });

    it('should populate the template', async () => {
      fixture.detectChanges();

      const title = fixture.debugElement.queryAll(By.css('.featured-news__title'));
      const paragraph = fixture.debugElement.queryAll(By.css('.featured-news__summary'));

      expect(title.length).toEqual(1);
      expect(title[0].nativeElement.innerHTML).toEqual(mockArticleWithImage.title);
      expect(paragraph.length).toEqual(1);
      expect(paragraph[0].nativeElement.innerHTML).toEqual(mockArticleWithImage.summary);
    });

    it('should use specified image if set in article', async () => {
      const filename = component['getArticleImageFilename'](component.article);
      expect(filename).toEqual(mockArticleWithImage.image);
    });
  });

  describe('mockArticleWithoutImage', () => {
    beforeEach(() => {
      component.article = mockArticleWithoutImage;
      fixture.detectChanges();
    });

    it('should use default image if not set in article', async () => {
      const filename = component['getArticleImageFilename'](component.article);
      expect(filename).toEqual(defaultImageFilename);
    });
  });

  it('should set hover state true on mouse over', async () => {
    component.hover = false;
    component.onMouseOver({});
    expect(component.hover).toBeTruthy();
  });

  it('should set hover state false on mouse out', async () => {
    component.hover = true;
    component.onMouseOut({});
    expect(component.hover).toBeFalsy();
  });
});
