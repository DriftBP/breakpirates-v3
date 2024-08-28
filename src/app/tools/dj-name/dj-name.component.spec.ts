import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';

import { DjNameComponent } from './dj-name.component';
import { DjNameService } from './services/dj-name.service';
import { MockDjNameService } from '../../../test/services/mock.dj-name.service';

describe('DjNameComponent', () => {
  let component: DjNameComponent;
  let fixture: ComponentFixture<DjNameComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
        declarations: [ DjNameComponent ],
        imports: [
          TranslateModule.forRoot(),
        ],
        providers: [
          {
            provide: DjNameService,
            useValue: MockDjNameService
          }
        ]
    });
    fixture = TestBed.createComponent(DjNameComponent);
    component = fixture.componentInstance;
  }));

  it('should create', async () => {
    expect(component).toBeDefined();
  });
});
