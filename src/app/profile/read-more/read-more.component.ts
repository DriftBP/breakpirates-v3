import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'bp-read-more',
  templateUrl: './read-more.component.html',
  styleUrls: ['./read-more.component.scss']
})
export class ReadMoreComponent implements AfterViewInit {
  @ViewChild('contentContainer') contentContainerElement: ElementRef;

  enableShowMore = true;
  showMore = false;

  constructor(private changeDetector : ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.enableShowMore = this.isTextOverflow(this.contentContainerElement);
  }

  ngAfterViewChecked(){
    this.changeDetector.detectChanges();
  }

  toggleShowMore(): void {
    this.showMore = !this.showMore;
  }

  private isTextOverflow(element: ElementRef): boolean {
    const elem = element.nativeElement;

    return elem.offsetHeight < elem.scrollHeight;
  }
}
