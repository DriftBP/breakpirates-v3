import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { MusicComponent } from './music.component';
import { BreadcrumbService } from '../shared/services/breadcrumb/breadcrumb.service';
import { MockBreadcrumbService } from '../../test/services/mock.breadcrumb.service';

const routes: Routes = [];

describe('MusicComponent', () => {
  let component: MusicComponent;
  let fixture: ComponentFixture<MusicComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
        imports: [
          MusicComponent,
          TranslateModule.forRoot()
        ],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: {}
          },
          {
            provide: BreadcrumbService,
            useClass: MockBreadcrumbService
          }
        ]
    });
    fixture = TestBed.createComponent(MusicComponent);
    component = fixture.componentInstance;
  }));

  it('should create', async () => {
    expect(component).toBeDefined();
  });
});
