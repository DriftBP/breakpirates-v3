import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RosterListComponent } from './roster-list.component';

describe('RosterListComponent', () => {
  let component: RosterListComponent;
  let fixture: ComponentFixture<RosterListComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
        imports: [
          RosterListComponent
        ]
    });
    fixture = TestBed.createComponent(RosterListComponent);
    component = fixture.componentInstance;
  });

  it('should create', async () => {
    expect(component).toBeDefined();
  });
});
