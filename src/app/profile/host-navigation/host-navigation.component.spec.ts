import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';

import { HostNavigationComponent } from './host-navigation.component';

describe('HostNavigationComponent', () => {
  let component: HostNavigationComponent;
  let fixture: ComponentFixture<HostNavigationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
        declarations: [
          HostNavigationComponent
        ],
        imports: [
          TranslateModule.forRoot(),
        ]
    });
    fixture = TestBed.createComponent(HostNavigationComponent);
    component = fixture.componentInstance;
  }));

  it('should create', async () => {
    expect(component).toBeDefined();
  });
});
