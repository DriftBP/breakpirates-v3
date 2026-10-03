import { TestBed } from '@angular/core/testing';

import { BreadcrumbService } from '../../shared/services/breadcrumb/breadcrumb.service';
import TechnicsLookupComponent from './technics-lookup.component';

describe('TechnicsLookupComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: BreadcrumbService, useValue: { setBreadcrumb: vi.fn() } }
      ]
    });
  });

  it('normalizes the serial number for the lookup result', () => {
    const component = TestBed.runInInjectionContext(() => new TechnicsLookupComponent());
    component.serialNumber = '  ge7 12345  ';

    component.lookup();

    expect(component.searchedSerial).toBe('GE7 12345');
    expect(component.hasSearched).toBe(true);
  });

  it('does not show a result for a blank serial number', () => {
    const component = TestBed.runInInjectionContext(() => new TechnicsLookupComponent());

    component.lookup();

    expect(component.hasSearched).toBe(false);
  });

  it('clears the current lookup', () => {
    const component = TestBed.runInInjectionContext(() => new TechnicsLookupComponent());
    component.serialNumber = 'GE712345';
    component.lookup();

    component.reset();

    expect(component.serialNumber).toBe('');
    expect(component.searchedSerial).toBe('');
    expect(component.hasSearched).toBe(false);
  });
});
