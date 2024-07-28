import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProductTypeSelectComponent } from './product-type-select.component';

describe('ProductTypeSelectComponent', () => {
  let component: ProductTypeSelectComponent;
  let fixture: ComponentFixture<ProductTypeSelectComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        ProductTypeSelectComponent
      ]
    });
    fixture = TestBed.createComponent(ProductTypeSelectComponent);
    component = fixture.componentInstance;
  }));

  it('should create', async () => {
    expect(component).toBeDefined();
  });
});
