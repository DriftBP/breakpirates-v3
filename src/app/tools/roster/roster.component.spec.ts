import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslatePipe } from '@ngx-translate/core';

import RosterComponent from './roster.component';

describe('RosterComponent', () => {
  let component: RosterComponent;
  let fixture: ComponentFixture<RosterComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
        imports: [
          RosterComponent,
          TranslatePipe
        ]
    });
    fixture = TestBed.createComponent(RosterComponent);
    component = fixture.componentInstance;
  });

  it('should create', async () => {
    expect(component).toBeDefined();
  });
});
