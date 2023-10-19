import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PageTemplateComponent } from './page-template.component';

describe('PageTemplateComponent', () => {
  let component: PageTemplateComponent;
  let fixture: ComponentFixture<PageTemplateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
        declarations: [ PageTemplateComponent ]
    });
    fixture = TestBed.createComponent(PageTemplateComponent);
    component = fixture.componentInstance;
  }));

  it('should create', async () => {
    expect(component).toBeDefined();
  });
});
