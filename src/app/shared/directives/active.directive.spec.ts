import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveDirective } from './active.directive';

const activeClass = 'active';

@Component({
  template: '<div [bpActive]="true"></div>',
  standalone: false
})
class TrueComponent {}

@Component({
  template: '<div [bpActive]="false"></div>',
  standalone: false
})
class FalseComponent {}

describe('ActiveDirective', () => {
  let fixture: ComponentFixture<TrueComponent>;
  let component: TrueComponent;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [
        TrueComponent,
        FalseComponent,
        ActiveDirective
      ]
    }).compileComponents();
  });

  it('should create an instance', () => {
    const directive = new ActiveDirective();
    expect(directive).toBeTruthy();
  });

  it('should have active class if true', () => {
    fixture = TestBed.createComponent(TrueComponent);
    component = fixture.componentInstance;

    const compiled: HTMLElement = fixture.debugElement.nativeElement;
    const div = compiled.querySelector('div');

    fixture.detectChanges();

    expect(div?.className).toEqual(activeClass);
  });

  it('should not have active class if false', () => {
    fixture = TestBed.createComponent(FalseComponent);
    component = fixture.componentInstance;

    const compiled: HTMLElement = fixture.debugElement.nativeElement;
    const div = compiled.querySelector('div');

    fixture.detectChanges();

    expect(div?.className).not.toEqual(activeClass);
  });
});
