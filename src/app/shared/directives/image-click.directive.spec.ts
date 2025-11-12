import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ImageClickDirective } from './image-click.directive';

@Component({
  template: `<div type="text" bpImageClick></div>`,
  standalone: false,
})
class TestImageClickDirectiveComponent {
}

describe('ImageClickDirective', () => {
  let component: TestImageClickDirectiveComponent;
  let fixture: ComponentFixture<TestImageClickDirectiveComponent>;
  let element: DebugElement;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        ImageClickDirective
      ],
      declarations: [
        TestImageClickDirectiveComponent
      ]
    });
    fixture = TestBed.createComponent(TestImageClickDirectiveComponent); (2)
    component = fixture.componentInstance;
    element = fixture.debugElement.query(By.css('div'));
  });

  it('should create', async () => {
    expect(component).toBeDefined();
  });

  it('hovering over element', () => {
    element.triggerEventHandler('mouseover', null);
    fixture.detectChanges();
    expect(element.nativeElement.style.cursor).toBe('pointer');

    element.triggerEventHandler('mouseout', null);
    fixture.detectChanges();
    expect(element.nativeElement.style.cursor).toBe('auto');
  });
});
