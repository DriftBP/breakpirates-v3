import { CommonModule } from '@angular/common';
import { ContentObserver } from '@angular/cdk/observers';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, viewChild, inject, signal } from '@angular/core';
import { Subscription } from 'rxjs';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
    selector: 'bp-read-more',
    templateUrl: './read-more.component.html',
    styleUrls: ['./read-more.component.scss'],
    imports: [
      CommonModule,
      TranslatePipe,
      FontAwesomeModule
    ]
})
export class ReadMoreComponent implements AfterViewInit, OnDestroy {
  private changeDetector = inject(ChangeDetectorRef);
  private contentObserver = inject(ContentObserver);

  contentContainerElement = viewChild.required<ElementRef>('contentContainer');

  contentObserverSubscription?: Subscription

  enableShowMore = signal(false);
  showMore = signal(false);

  faChevronUp = faChevronUp;
  faChevronDown = faChevronDown;

  ngAfterViewInit(): void {
    this.initialise();

    this.contentObserverSubscription = this.contentObserver.observe(this.contentContainerElement().nativeElement).subscribe(() => {
      this.initialise();
    });
  }

  ngOnDestroy(): void {
    if (this.contentObserverSubscription) {
      this.contentObserverSubscription.unsubscribe();
    }
  }

  toggleShowMore(): void {
    this.showMore.update(showMore => !showMore);
  }

  private initialise(): void {
    this.enableShowMore.set(true);
    this.showMore.set(false);
    this.changeDetector.detectChanges();
    this.enableShowMore.set(this.isTextOverflow(this.contentContainerElement()));
  }

  private isTextOverflow(element: ElementRef): boolean {
    const elem = element.nativeElement;

    return elem.offsetHeight < elem.scrollHeight;
  }
}
