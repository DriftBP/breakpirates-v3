import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveDirective } from './active.directive';

const activeClass = 'active';

@Component({
  selector: 'spec-true-component',
  standalone: true,
  template: '<div [bpActive]="true"></div>',
  imports: [ActiveDirective]
})
class TrueComponent {}

@Component({
  selector: 'spec-false-component',
  standalone: true,
  template: '<div [bpActive]="false"></div>',
  imports: [ActiveDirective]
})
class FalseComponent {}

describe('ActiveDirective', () => {
  let fixture: ComponentFixture<TrueComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        ActiveDirective,
        TrueComponent,
        FalseComponent
      ]
    }).compileComponents();
  });

  it('should create an instance', () => {
    const directive = new ActiveDirective();
    expect(directive).toBeTruthy();
  });

  it('should have active class if true', () => {
    fixture = TestBed.createComponent(TrueComponent);

    const compiled: HTMLElement = fixture.debugElement.nativeElement;
    const div = compiled.querySelector('div');

    fixture.detectChanges();

    expect(div?.className).toEqual(activeClass);
  });

  it('should not have active class if false', () => {
    fixture = TestBed.createComponent(FalseComponent);

    const compiled: HTMLElement = fixture.debugElement.nativeElement;
    const div = compiled.querySelector('div');

    fixture.detectChanges();

    expect(div?.className).not.toEqual(activeClass);
  });
});
