import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HostListComponent } from './host-list.component';
import { MockSortByPipe } from '../../../test/pipes/mock.sort-by.pipe';

describe('HostListComponent', () => {
  let component: HostListComponent;
  let fixture: ComponentFixture<HostListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
        declarations: [
          HostListComponent,
          MockSortByPipe
        ]
    });
    fixture = TestBed.createComponent(HostListComponent);
    component = fixture.componentInstance;
  }));

  it('should create', async () => {
    expect(component).toBeDefined();
  });
});
