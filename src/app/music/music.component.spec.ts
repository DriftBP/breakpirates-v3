import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MusicComponent } from './music.component';

describe('MusicComponent', () => {
  let component: MusicComponent;
  let fixture: ComponentFixture<MusicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MusicComponent ],
      imports: [
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
