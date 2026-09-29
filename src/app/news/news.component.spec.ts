import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { MockTranslateService } from '../../test/services/mock.translate.service';

import NewsComponent from './news.component';
import { BreadcrumbService } from '../shared/services/breadcrumb/breadcrumb.service';
import { MockBreadcrumbService } from '../../test/services/mock.breadcrumb.service';

describe('NewsComponent', () => {
  let component: NewsComponent;
  let fixture: ComponentFixture<NewsComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
        imports: [
          NewsComponent,
          TranslatePipe
        ],
        providers: [
          {
            provide: TranslateService,
            useClass: MockTranslateService
          },
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
    fixture = TestBed.createComponent(NewsComponent);
    component = fixture.componentInstance;
  });

  it('should create', async () => {
    expect(component).toBeDefined();
  });

  it('groups other news by year while preserving article order', () => {
    const article = (id: number, year: number) => ({
      id,
      date: String(Date.UTC(year, 0, 1) / 1000),
      title: `Article ${id}`,
      text: '',
      summary: '',
      image: null,
      added_by: ''
    });

    fixture.componentRef.setInput('news', [
      article(1, 2025),
      article(2, 2025),
      article(3, 2024),
      article(4, 2025),
      article(5, 2023),
      article(6, 2024),
      article(7, 2023)
    ]);

    expect(component.otherNewsByYear()).toEqual([
      { year: 2023, articles: [expect.objectContaining({ id: 5 }), expect.objectContaining({ id: 7 })] },
      { year: 2024, articles: [expect.objectContaining({ id: 6 })] }
    ]);
  });
});
