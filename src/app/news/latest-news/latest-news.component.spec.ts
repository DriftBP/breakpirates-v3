import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestNewsComponent } from './latest-news.component';
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
  let component: LatestNewsComponent;
  let fixture: ComponentFixture<LatestNewsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        LatestNewsComponent
      ]
    });
    fixture = TestBed.createComponent(LatestNewsComponent);
    component = fixture.componentInstance;
  });

  it('should have at least one article', () => {
    fixture.componentRef.setInput('news', [mockNews]);

    expect(component.news().length).toBeGreaterThan(0);
  });
});
