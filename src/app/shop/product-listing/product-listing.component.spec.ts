import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProductListingComponent } from './product-listing.component';

describe('ProductListingComponent', () => {
  let component: ProductListingComponent;
  let fixture: ComponentFixture<ProductListingComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
        declarations: [ ProductListingComponent ]
    });
    fixture = TestBed.createComponent(ProductListingComponent);
    component = fixture.componentInstance;
  }));

  it('should create', async () => {
    expect(component).toBeDefined();
  });
});

