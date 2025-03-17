import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ContentBoxComponent } from './content-box.component';

describe('ContentBoxComponent', () => {
  let component: ContentBoxComponent;
  let fixture: ComponentFixture<ContentBoxComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
        imports: [
          ContentBoxComponent
        ]
    });
    fixture = TestBed.createComponent(ContentBoxComponent);
    component = fixture.componentInstance;
  }));

  it('should create', async () => {
    expect(component).toBeDefined();
  });
});
