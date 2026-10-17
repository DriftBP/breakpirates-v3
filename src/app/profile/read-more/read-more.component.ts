import { CommonModule } from '@angular/common';
import { ContentObserver } from '@angular/cdk/observers';
import { AfterViewInit, ChangeDetectorRef, Component, DestroyRef, ElementRef, viewChild, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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
export class ReadMoreComponent implements AfterViewInit {
  private changeDetector = inject(ChangeDetectorRef);
  private destroyRef = inject(DestroyRef);
  private contentObserver = inject(ContentObserver);

  contentContainerElement = viewChild.required<ElementRef>('contentContainer');

  enableShowMore = signal(false);
  showMore = signal(false);

  faChevronUp = faChevronUp;
  faChevronDown = faChevronDown;

  ngAfterViewInit(): void {
    this.initialise();

    this.contentObserver.observe(this.contentContainerElement().nativeElement).pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(() => this.initialise());
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
