import { async } from '@angular/core/testing';
import { Shallow } from 'shallow-render';
import { RouterModule, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateService } from '@ngx-translate/core';

import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { noop } from 'rxjs';

const routes: Routes = [];

describe('AppComponent', () => {
  let shallow: Shallow<AppComponent>;

  beforeEach(async(() => {
    shallow = new Shallow(AppComponent, AppModule)
      .replaceModule(RouterModule, RouterTestingModule.withRoutes(routes))
      .replaceModule(BrowserAnimationsModule, NoopAnimationsModule)
      .mock(TranslateService, {
        setDefaultLang: jest.fn
      });
  }));

  it('should create', async () => {
    const { element } = await shallow.render();

    expect(element.nativeElement).toBeTruthy();
  });
});
