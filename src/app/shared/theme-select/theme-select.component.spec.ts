import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';

import { ThemeSelectComponent } from './theme-select.component';

describe('ThemeSelectComponent', () => {
  let component: ThemeSelectComponent;
  let fixture: ComponentFixture<ThemeSelectComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
        declarations: [ ThemeSelectComponent ],
        imports: [
          TranslateModule.forRoot(),
        ]
    });
    fixture = TestBed.createComponent(ThemeSelectComponent);
    component = fixture.componentInstance;
  }));

  it('should create', async () => {
    expect(component).toBeDefined();
  });
});
