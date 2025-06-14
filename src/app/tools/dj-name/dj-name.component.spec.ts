import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';

import DjNameComponent from './dj-name.component';

describe('DjNameComponent', () => {
  let component: DjNameComponent;
  let fixture: ComponentFixture<DjNameComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        DjNameComponent,
        TranslateModule.forRoot()
      ]
    });
    fixture = TestBed.createComponent(DjNameComponent);
    component = fixture.componentInstance;
  }));

  it('should create', async () => {
    expect(component).toBeDefined();
  });
});
