import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';

import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
        declarations: [ FooterComponent ],
        imports: [
          TranslateModule.forRoot(),
        ]
    });
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
  }));

  it('should create', async () => {
    expect(component).toBeDefined();
  });
});
