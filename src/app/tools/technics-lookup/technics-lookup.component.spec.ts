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
    component.serialNumber = '  mj2kc01234  ';

    component.lookup();

    expect(component.searchedSerial).toBe('MJ2KC01234');
    expect(component.hasSearched).toBe(true);
  });

  it('rejects serials outside the usual 10-11 character format', () => {
    const component = TestBed.runInInjectionContext(() => new TechnicsLookupComponent());
    component.serialNumber = 'GE712345';

    component.lookup();

    expect(component.hasSearched).toBe(false);
  });

  it('decodes the month and year suffix from a date-coded serial', () => {
    const component = TestBed.runInInjectionContext(() => new TechnicsLookupComponent());
    component.serialNumber = 'MJ2KC01234';

    component.lookup();

    expect(component.manufactureMonth).toBe('November');
    expect(component.yearSuffix).toBe('2');
  });

  it('decodes numeric month and day codes', () => {
    const component = TestBed.runInInjectionContext(() => new TechnicsLookupComponent());
    component.serialNumber = 'MJ3912D108';

    component.lookup();

    expect(component.manufactureMonth).toBe('September');
    expect(component.manufactureDay).toBe(12);
    expect(component.yearSuffix).toBe('3');
  });

  it('uses the selected revision era to narrow possible years', () => {
    const component = TestBed.runInInjectionContext(() => new TechnicsLookupComponent());
    component.modelVariant = 'MK3';
    component.serialNumber = 'MJ2KC01234';

    component.lookup();

    expect(component.possibleYears).toEqual([1992]);
  });

  it('leaves the date unknown when the serial does not match the recognized format', () => {
    const component = TestBed.runInInjectionContext(() => new TechnicsLookupComponent());
    component.serialNumber = 'NHOJF20765';

    component.lookup();

    expect(component.manufactureMonth).toBeNull();
    expect(component.manufactureDay).toBeNull();
    expect(component.yearSuffix).toBeNull();
    expect(component.possibleYears).toEqual([]);
  });

  it('does not show a result for a blank serial number', () => {
    const component = TestBed.runInInjectionContext(() => new TechnicsLookupComponent());

    component.lookup();

    expect(component.hasSearched).toBe(false);
  });

  it('clears the current lookup', () => {
    const component = TestBed.runInInjectionContext(() => new TechnicsLookupComponent());
    component.serialNumber = 'GE4FB001154';
    component.lookup();

    component.reset();

    expect(component.serialNumber).toBe('');
    expect(component.searchedSerial).toBe('');
    expect(component.manufactureMonth).toBeNull();
    expect(component.manufactureDay).toBeNull();
    expect(component.yearSuffix).toBeNull();
    expect(component.possibleYears).toEqual([]);
    expect(component.hasSearched).toBe(false);
  });
});
