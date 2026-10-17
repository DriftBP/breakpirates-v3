import { ContentObserver } from '@angular/cdk/observers';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';

import { translateTestingProviders } from '../../../test/providers';
import { ReadMoreComponent } from './read-more.component';

describe('ReadMoreComponent', () => {
  let component: ReadMoreComponent;
  let fixture: ComponentFixture<ReadMoreComponent>;
  let contentChanges: Subject<MutationRecord[]>;

  beforeEach(async () => {
    contentChanges = new Subject<MutationRecord[]>();
    TestBed.configureTestingModule({
        imports: [
          ReadMoreComponent
        ],
        providers: [
          ...translateTestingProviders,
          {
            provide: ContentObserver,
            useValue: { observe: () => contentChanges.asObservable() }
          }
        ]
    });
    fixture = TestBed.createComponent(ReadMoreComponent);
    component = fixture.componentInstance;
  });

  it('should create', async () => {
    expect(component).toBeDefined();
  });

  it('should show the toggle only when content overflows', () => {
    fixture.detectChanges();
    const content = fixture.nativeElement.querySelector('div');

    Object.defineProperties(content, {
      offsetHeight: { configurable: true, value: 222 },
      scrollHeight: { configurable: true, value: 400 }
    });
    contentChanges.next([]);
    fixture.detectChanges();

    expect(component.enableShowMore()).toBeTruthy();
    expect(fixture.nativeElement.querySelector('button')).not.toBeNull();

    Object.defineProperty(content, 'scrollHeight', { configurable: true, value: 222 });
    contentChanges.next([]);
    fixture.detectChanges();

    expect(component.enableShowMore()).toBeFalsy();
    expect(fixture.nativeElement.querySelector('button')).toBeNull();
  });
});
