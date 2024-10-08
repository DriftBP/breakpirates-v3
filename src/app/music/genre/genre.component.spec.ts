import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';

import { GenreComponent } from './genre.component';

describe('GenreComponent', () => {
  let component: GenreComponent;
  let fixture: ComponentFixture<GenreComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        GenreComponent,
        TranslateModule.forRoot(),
      ]
    });
    fixture = TestBed.createComponent(GenreComponent);
    component = fixture.componentInstance;
  }));

  it('should create', async () => {
    expect(component).toBeDefined();
  });
});
