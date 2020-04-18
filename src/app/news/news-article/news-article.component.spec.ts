import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { NewsArticleComponent } from './news-article.component';
import { SafePipe } from '../../shared/safe.pipe';

describe('NewsArticleComponent', () => {
  let component: NewsArticleComponent;
  let fixture: ComponentFixture<NewsArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NewsArticleComponent,
        SafePipe
      ],
      imports: [
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
