import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StandalonePlayerComponent } from './standalone-player.component';

describe('StandalonePlayerComponent', () => {
  let component: StandalonePlayerComponent;
  let fixture: ComponentFixture<StandalonePlayerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
        declarations: [ StandalonePlayerComponent ]
    });
    fixture = TestBed.createComponent(StandalonePlayerComponent);
    component = fixture.componentInstance;
  }));

  it('should create', async () => {
    expect(component).toBeDefined();
  });
});
