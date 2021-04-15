import { ContentObserver } from '@angular/cdk/observers';
import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'bp-read-more',
  templateUrl: './read-more.component.html',
  styleUrls: ['./read-more.component.scss']
})
export class ReadMoreComponent implements AfterViewInit, AfterViewChecked, OnDestroy {
  @ViewChild('contentContainer') contentContainerElement: ElementRef;

  contentObserverSubscription: Subscription

  enableShowMore: boolean;
  showMore: boolean;

  constructor(
    private changeDetector : ChangeDetectorRef,
    private contentObserver: ContentObserver
  ) {}

  ngAfterViewInit(): void {
    this.initialise();

    this.contentObserverSubscription = this.contentObserver.observe(this.contentContainerElement.nativeElement).subscribe((event: MutationRecord[]) => {
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
    this.enableShowMore = this.isTextOverflow(this.contentContainerElement);
  }

  private isTextOverflow(element: ElementRef): boolean {
    const elem = element.nativeElement;

    this.changeDetector.detectChanges();

    return elem.offsetHeight < elem.scrollHeight;
  }
}
