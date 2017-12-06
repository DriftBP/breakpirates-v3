import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TuneInComponent } from './tune-in.component';

describe('TuneInComponent', () => {
  let component: TuneInComponent;
  let fixture: ComponentFixture<TuneInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TuneInComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TuneInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
