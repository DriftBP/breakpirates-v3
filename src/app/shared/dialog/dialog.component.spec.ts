import { waitForAsync } from '@angular/core/testing';
import { Shallow } from 'shallow-render/dist/lib/shallow';

import { DialogComponent } from './dialog.component';
import { SharedModule } from '../shared.module';

describe('DialogComponent', () => {
  let shallow: Shallow<DialogComponent>;

  beforeEach(waitForAsync(() => {
    shallow = new Shallow(DialogComponent, SharedModule);
  }));

  it('should create', async () => {
    const { element } = await shallow.render();

    expect(element.nativeElement).toBeTruthy();
  });

  it('should be closed by default', async () => {
    const { find } = await shallow.render();

    const dialog = find('dialog');

    expect(dialog.attributes['open']).toBeFalsy();
  });

  it('should set the dialog content', async () => {
    const content = 'My content';

    const { instance, find } = await shallow.render();

    const contentElement = find('.dialog__content');

    instance['setContent'](content);

    expect(contentElement.nativeElement.innerHTML).toEqual(content);
  });

  it('should set the dialog title', async () => {
    const title = 'My title';

    const { instance, find } = await shallow.render();

    const titleElement = find('.dialog__title');

    instance['setTitle'](title);

    expect(titleElement.nativeElement.innerHTML).toEqual(title);
  });
});
