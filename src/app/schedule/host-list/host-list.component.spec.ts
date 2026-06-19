import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostListComponent } from './host-list.component';

describe('HostListComponent', () => {
  let component: HostListComponent;
  let fixture: ComponentFixture<HostListComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        HostListComponent
      ]
    });
    fixture = TestBed.createComponent(HostListComponent);
    component = fixture.componentInstance;
  });

  it('should create', async () => {
    expect(component).toBeDefined();
  });
});
