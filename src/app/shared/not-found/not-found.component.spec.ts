import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';

import { NotFoundComponent } from './not-found.component';

describe('NotFoundComponent', () => {
  let component: NotFoundComponent;
  let fixture: ComponentFixture<NotFoundComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
        imports: [
          NotFoundComponent,
          TranslateModule.forRoot(),
        ]
    });
    fixture = TestBed.createComponent(NotFoundComponent);
    component = fixture.componentInstance;
  }));

  it('should create', async () => {
    expect(component).toBeDefined();
  });
});
