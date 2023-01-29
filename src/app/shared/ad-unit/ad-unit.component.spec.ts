import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AdUnitComponent } from './ad-unit.component';

describe('AdUnitComponent', () => {
  let component: AdUnitComponent;
  let fixture: ComponentFixture<AdUnitComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
        declarations: [ AdUnitComponent ]
    });
    fixture = TestBed.createComponent(AdUnitComponent);
    component = fixture.componentInstance;
  }));

  it('should create', async () => {
    expect(component).toBeDefined();
  });
});
