import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';

import { HostNavigationComponent } from './host-navigation.component';

describe('HostNavigationComponent', () => {
  let component: HostNavigationComponent;
  let fixture: ComponentFixture<HostNavigationComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
        imports: [
          HostNavigationComponent,
          TranslateModule.forRoot(),
        ]
    });
    fixture = TestBed.createComponent(HostNavigationComponent);
    component = fixture.componentInstance;
  });

  it('should create', async () => {
    expect(component).toBeDefined();
  });
});
