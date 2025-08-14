import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadMoreComponent } from './read-more.component';

describe('ReadMoreComponent', () => {
  let component: ReadMoreComponent;
  let fixture: ComponentFixture<ReadMoreComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
        imports: [
          ReadMoreComponent
        ]
    });
    fixture = TestBed.createComponent(ReadMoreComponent);
    component = fixture.componentInstance;
  });

  it('should create', async () => {
    expect(component).toBeDefined();
  });
});
