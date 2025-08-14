import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentBoxComponent } from './content-box.component';

describe('ContentBoxComponent', () => {
  let component: ContentBoxComponent;
  let fixture: ComponentFixture<ContentBoxComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        ContentBoxComponent
      ]
    });
    fixture = TestBed.createComponent(ContentBoxComponent);
    component = fixture.componentInstance;
  });

  it('should create', async () => {
    expect(component).toBeDefined();
  });
});
