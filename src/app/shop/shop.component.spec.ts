import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { ShopComponent } from './shop.component';

describe('ShopComponent', () => {
  let component: ShopComponent;
  let fixture: ComponentFixture<ShopComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        ShopComponent,
        TranslateModule.forRoot(),
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {}
        }
      ]
    });
    fixture = TestBed.createComponent(ShopComponent);
    component = fixture.componentInstance;
  }));

  it('should create', async () => {
    expect(component).toBeDefined();
  });
});
