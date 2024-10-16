import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';

import { DjsComponent } from './djs.component';

describe('DjsComponent', () => {
  let component: DjsComponent;
  let fixture: ComponentFixture<DjsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
        imports: [
          DjsComponent,
          TranslateModule.forRoot()
        ]
    });
    fixture = TestBed.createComponent(DjsComponent);
    component = fixture.componentInstance;
  }));

  it('should create', async () => {
    expect(component).toBeDefined();
  });
});
