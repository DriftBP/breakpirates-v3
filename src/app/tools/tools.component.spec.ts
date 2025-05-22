import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';

import { ToolsComponent } from './tools.component';

describe('ToolsComponent', () => {
  let component: ToolsComponent;
  let fixture: ComponentFixture<ToolsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        ToolsComponent,
        TranslateModule.forRoot(),
      ]
    });
    fixture = TestBed.createComponent(ToolsComponent);
    component = fixture.componentInstance;
  }));

  it('should create', async () => {
    expect(component).toBeDefined();
  });
});
