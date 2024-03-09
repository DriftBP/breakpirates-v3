import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { NewsArticleComponent } from './news-article.component';
import { BreadcrumbService } from '../../shared/services/breadcrumb/breadcrumb.service';
import { MockBreadcrumbService } from '../../../test/services/mock.breadcrumb.service';
import { mockArticleWithImage, mockArticleWithoutImage } from '../../../test/data/mock.articles';
import { By } from '@angular/platform-browser';

describe('NewsArticleComponent', () => {
  let component: NewsArticleComponent;
  let fixture: ComponentFixture<NewsArticleComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
        declarations: [
          NewsArticleComponent
        ],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: {}
          },
          {
            provide: BreadcrumbService,
            useClass: MockBreadcrumbService
          }
        ]
    });
    fixture = TestBed.createComponent(NewsArticleComponent);
    component = fixture.componentInstance;
  }));

  it('should create', async () => {
    expect(component).toBeDefined();
  });

  describe('News article images', () => {
    it('should not display an image if the article doesn`t have one defined', async () => {
      component.article = mockArticleWithoutImage;

      fixture.detectChanges();

      const image = fixture.debugElement.query(By.css('.news-article__image'));

      expect(image).toBeNull();
    });

    it('should display an image if the article has one defined', async () => {
      component.article = mockArticleWithImage;

      fixture.detectChanges();

      const image: HTMLImageElement = fixture.debugElement.query(By.css('.news-article__image')).nativeElement;

      expect(image).toBeDefined();
      expect(image.src).toBeDefined();
    });
  });
});
