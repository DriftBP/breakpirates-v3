import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DjListComponent } from './dj-list.component';

describe('DjListComponent', () => {
  let component: DjListComponent;
  let fixture: ComponentFixture<DjListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
        imports: [
          DjListComponent
        ]
    });
    fixture = TestBed.createComponent(DjListComponent);
    component = fixture.componentInstance;
  }));

  it('should create', async () => {
    expect(component).toBeDefined();
  });
});
