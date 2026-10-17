import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { MockTranslateService } from '../../../test/services/mock.translate.service';

import NewsArticleComponent from './news-article.component';
import { BreadcrumbService } from '../../shared/services/breadcrumb/breadcrumb.service';
import { MockBreadcrumbService } from '../../../test/services/mock.breadcrumb.service';
import { mockArticleWithImage, mockArticleWithoutImage } from '../../../test/data/mock.articles';

describe('NewsArticleComponent', () => {
  let fixture: ComponentFixture<NewsArticleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NewsArticleComponent,
        TranslatePipe
      ],
      providers: [
        {
          provide: TranslateService,
          useClass: MockTranslateService
        },
        {
          provide: BreadcrumbService,
          useClass: MockBreadcrumbService
        },
        provideRouter([])
      ]
    });
    fixture = TestBed.createComponent(NewsArticleComponent);
  });

  describe('News article images', () => {
    it('should not display an image if the article does not have one defined', () => {
      fixture.componentRef.setInput('article', mockArticleWithoutImage);

      fixture.detectChanges();

      const image = fixture.debugElement.query(By.css('.news-article__image'));

      expect(image).toBeNull();
    });

    it('should display an image if the article has one defined', () => {
      fixture.componentRef.setInput('article', mockArticleWithImage);

      fixture.detectChanges();

      const image: HTMLImageElement = fixture.debugElement.query(By.css('.news-article__image')).nativeElement;

      expect(image.src).toContain(mockArticleWithImage.image);
    });
  });

  it('shows previous and next articles with wraparound links', () => {
    const articles = [
      { ...mockArticleWithoutImage, id: 1, title: 'First article' },
      { ...mockArticleWithoutImage, id: 2, title: 'Current article' },
      { ...mockArticleWithoutImage, id: 3, title: 'Last article' }
    ];

    fixture.componentRef.setInput('article', articles[0]);
    fixture.componentRef.setInput('news', articles);
    fixture.detectChanges();

    const links: HTMLAnchorElement[] = Array.from(
      fixture.nativeElement.querySelectorAll('.content-navigation__link')
    );

    expect(links.map(link => link.textContent?.trim())).toEqual(['Last article', 'Current article']);
    expect(links.map(link => link.getAttribute('href'))).toEqual(['/news/3', '/news/2']);
  });
});
