import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { DialogComponent } from './dialog.component';

describe('DialogComponent', () => {
  let component: DialogComponent;
  let fixture: ComponentFixture<DialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        DialogComponent
      ]
    });
    fixture = TestBed.createComponent(DialogComponent);
    component = fixture.componentInstance;
  });

  it('should be closed by default', () => {
    const dialog = fixture.debugElement.nativeElement.querySelector('dialog');

    expect(dialog.attributes['open']).toBeFalsy();
  });

  it('should set the dialog content', () => {
    const content = 'My content';

    fixture.detectChanges();

    const contentElement = fixture.debugElement.query(By.css('.dialog__content'));

    component['setContent'](content);

    expect(contentElement.nativeElement.innerHTML).toEqual(content);
  });

  it('should set the dialog title', () => {
    const title = 'My title';

    fixture.detectChanges();

    const titleElement = fixture.debugElement.query(By.css('.dialog__title'));

    component['setTitle'](title);

    expect(titleElement.nativeElement.innerHTML).toEqual(title);
  });
});
