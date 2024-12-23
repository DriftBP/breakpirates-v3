import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { HostDetailsComponent } from './host-details.component';
import { BreadcrumbService } from '../../shared/services/breadcrumb/breadcrumb.service';
import { ProfileService } from '../services/profile.service';
import { MockProfileService } from '../../../test/services/mock.profile.service';
import { MockBreadcrumbService } from '../../../test/services/mock.breadcrumb.service';
import { mockHost } from '../../../test/data/mock.profiles';
import { Host } from '../host';
import { MockSafePipe } from '../../../test/pipes/mock.safe.pipe';

const mockHostWithBiogAndImage: Host = {
  ...mockHost,
  biog: 'biog',
  image: 'image.jpg'
};

describe('HostDetailsComponent', () => {
  let component: HostDetailsComponent;
  let fixture: ComponentFixture<HostDetailsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
        declarations: [
          HostDetailsComponent
        ],
        imports: [
          TranslateModule.forRoot(),
          MockSafePipe
        ],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: {}
          },
          {
            provide: ProfileService,
            useClass: MockProfileService
          },
          {
            provide: BreadcrumbService,
            useClass: MockBreadcrumbService
          }
        ]
    });
    fixture = TestBed.createComponent(HostDetailsComponent);
    component = fixture.componentInstance;
  }));

  it('should create', async () => {
    expect(component).toBeDefined();
  });

  describe('Host images', () => {
    it('should not display an image if the host doesn`t have one defined', async () => {
      fixture.componentRef.setInput('profile', mockHost);

      fixture.detectChanges();

      const image = fixture.debugElement.query(By.css('.host-details__image'));

      expect(image).toBeNull();
    });

    it('should display an image if the host has one and a description defined', async () => {
      fixture.componentRef.setInput('profile', mockHostWithBiogAndImage);

      fixture.detectChanges();

      const image: HTMLImageElement = fixture.debugElement.query(By.css('.host-details__image')).nativeElement;

      expect(image).toBeDefined();
      expect(image.src).toBeDefined();
    });
  });

  it('should recognise non-empty value', async () => {
    expect(component.hasValue('test')).toBeTruthy();
  });

  it('should recognise empty value', async () => {
    expect(component.hasValue(null)).toBeFalsy();
    expect(component.hasValue('')).toBeFalsy();
  });
});
