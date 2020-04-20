import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

import { HostDetailsComponent } from './host-details.component';
import { SafePipe } from '../../shared/pipes/safe.pipe';
import { ShowSummaryComponent } from '../../schedule/show-summary/show-summary.component';
import { ProfileService } from '../profile.service';

describe('HostDetailsComponent', () => {
  let component: HostDetailsComponent;
  let fixture: ComponentFixture<HostDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HostDetailsComponent,
        ShowSummaryComponent,
        SafePipe
      ],
      imports: [
        RouterTestingModule,
        HttpClientModule
      ],
      providers: [
        ProfileService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
