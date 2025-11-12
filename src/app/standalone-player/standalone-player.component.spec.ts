import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';

import { StandalonePlayerComponent } from './standalone-player.component';

describe('StandalonePlayerComponent', () => {
  let component: StandalonePlayerComponent;
  let fixture: ComponentFixture<StandalonePlayerComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
        imports: [
          StandalonePlayerComponent,
          TranslateModule.forRoot(),
        ]
    });
    fixture = TestBed.createComponent(StandalonePlayerComponent);
    component = fixture.componentInstance;
  });

  it('should create', async () => {
    expect(component).toBeDefined();
  });
});
