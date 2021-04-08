import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'bp-read-more',
  templateUrl: './read-more.component.html',
  styleUrls: ['./read-more.component.scss']
})
export class ReadMoreComponent implements AfterViewInit {
  @ViewChild('contentContainer') contentContainerElement: ElementRef;

  enableShowMore = true;
  showMore = false;

  ngAfterViewInit(): void {
    this.enableShowMore = this.isTextOverflow(this.contentContainerElement);
  }

  toggleShowMore(): void {
    this.showMore = !this.showMore;
  }

  private isTextOverflow(element: ElementRef): boolean {
    const elem = element.nativeElement;

    return elem.offsetHeight < elem.scrollHeight;
  }
}
