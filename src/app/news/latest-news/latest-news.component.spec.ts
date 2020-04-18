import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

import { LatestNewsComponent } from './latest-news.component';
import { FeaturedNewsComponent } from '../featured-news/featured-news.component';
import { NewsService } from '../news.service';

describe('LatestNewsComponent', () => {
  let component: LatestNewsComponent;
  let fixture: ComponentFixture<LatestNewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LatestNewsComponent,
        FeaturedNewsComponent
      ],
      imports: [
        RouterTestingModule,
        HttpClientModule
      ],
      providers: [
        NewsService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LatestNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
