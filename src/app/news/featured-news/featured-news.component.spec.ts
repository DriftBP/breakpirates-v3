import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

import { FeaturedNewsComponent } from './featured-news.component';
import { mockArticleWithImage, mockArticleWithoutImage } from '../../../test/data/mock.articles';

const defaultImageFilename = 'bp.jpg';

describe('FeaturedNewsComponent', () => {
  let component: FeaturedNewsComponent;
  let fixture: ComponentFixture<FeaturedNewsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        FeaturedNewsComponent
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {}
        }
      ]
    });
    fixture = TestBed.createComponent(FeaturedNewsComponent);
    component = fixture.componentInstance;
  }));

  it('should create', async () => {
    expect(component).toBeDefined();
  });

  it('should populate the template', async () => {
    fixture.componentRef.setInput('article', mockArticleWithImage);

    fixture.detectChanges();

    const title = fixture.debugElement.queryAll(By.css('.featured-news__title'));
    const paragraph = fixture.debugElement.queryAll(By.css('.featured-news__summary'));

    expect(title.length).toEqual(1);
    expect(title[0].nativeElement.innerHTML).toEqual(mockArticleWithImage.title);
    expect(paragraph.length).toEqual(1);
    expect(paragraph[0].nativeElement.innerHTML).toEqual(mockArticleWithImage.summary);
  });

  it('should use specified image if set in article', async () => {
    fixture.componentRef.setInput('article', mockArticleWithImage);

    const filename = component['getArticleImageFilename'](component.article());
    expect(filename).toEqual(mockArticleWithImage.image);
  });

  it('should use default image if not set in article', async () => {
    fixture.componentRef.setInput('article', mockArticleWithoutImage);

    const filename = component['getArticleImageFilename'](component.article());
    expect(filename).toEqual(defaultImageFilename);
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
