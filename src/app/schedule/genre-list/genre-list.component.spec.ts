import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GenreListComponent } from './genre-list.component';
import { MockSortByPipe } from '../../../test/pipes/mock.sort-by.pipe';

describe('GenreListComponent', () => {
  let component: GenreListComponent;
  let fixture: ComponentFixture<GenreListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
        declarations: [
          GenreListComponent,
          MockSortByPipe
        ]
    });
    fixture = TestBed.createComponent(GenreListComponent);
    component = fixture.componentInstance;
  }));

  it('should create', async () => {
    expect(component).toBeDefined();
  });
});
