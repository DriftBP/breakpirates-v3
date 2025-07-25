import { CommonModule } from '@angular/common';
import { ContentObserver } from '@angular/cdk/observers';
import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, viewChild, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'bp-read-more',
    templateUrl: './read-more.component.html',
    styleUrls: ['./read-more.component.scss'],
    imports: [
      CommonModule,
      TranslateModule,
      FontAwesomeModule
    ]
})
export class ReadMoreComponent implements AfterViewInit, AfterViewChecked, OnDestroy {
  private changeDetector = inject(ChangeDetectorRef);
  private contentObserver = inject(ContentObserver);

  contentContainerElement = viewChild.required<ElementRef>('contentContainer');

  contentObserverSubscription?: Subscription

  enableShowMore = false;
  showMore = false;

  faChevronUp = faChevronUp;
  faChevronDown = faChevronDown;

  ngAfterViewInit(): void {
    this.initialise();

    this.contentObserverSubscription = this.contentObserver.observe(this.contentContainerElement().nativeElement).subscribe((event: MutationRecord[]) => {
      this.initialise();
    });
  }

  ngAfterViewChecked(): void {
    this.changeDetector.detectChanges();
  }

  ngOnDestroy(): void {
    if (this.contentObserverSubscription) {
      this.contentObserverSubscription.unsubscribe();
    }
  }

  toggleShowMore(): void {
    this.showMore = !this.showMore;
  }

  private initialise(): void {
    this.enableShowMore = true;
    this.showMore = false;
    this.enableShowMore = this.isTextOverflow(this.contentContainerElement());
  }

  private isTextOverflow(element: ElementRef): boolean {
    const elem = element.nativeElement;

    this.changeDetector.detectChanges();

    return elem.offsetHeight < elem.scrollHeight;
  }
}
