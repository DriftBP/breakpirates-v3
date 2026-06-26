import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslatePipe } from '@ngx-translate/core';

import { StandalonePlayerComponent } from './standalone-player.component';

describe('StandalonePlayerComponent', () => {
  let component: StandalonePlayerComponent;
  let fixture: ComponentFixture<StandalonePlayerComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
        imports: [
          StandalonePlayerComponent,
          TranslatePipe
        ]
    });
    fixture = TestBed.createComponent(StandalonePlayerComponent);
    component = fixture.componentInstance;
  });

  it('should create', async () => {
    expect(component).toBeDefined();
  });
});
