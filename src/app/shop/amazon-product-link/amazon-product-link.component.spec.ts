import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AmazonProductLinkComponent } from './amazon-product-link.component';

describe('AmazonProductLinkComponent', () => {
  let component: AmazonProductLinkComponent;
  let fixture: ComponentFixture<AmazonProductLinkComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
        declarations: [ AmazonProductLinkComponent ]
    });
    fixture = TestBed.createComponent(AmazonProductLinkComponent);
    component = fixture.componentInstance;
  }));

  it('should create', async () => {
    expect(component).toBeDefined();
  });
});
