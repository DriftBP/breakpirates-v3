import { Component, OnInit } from '@angular/core';
import { TuneInService } from '../../tune-in/tune-in.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html'
})
export class NavigationComponent implements OnInit {

  constructor(
    private tuneInService: TuneInService
  ) { }

  archiveUrl: string;
  isCollapsed: boolean;

  ngOnInit() {
    this.archiveUrl = this.tuneInService.archiveUrl;
    this.isCollapsed = true;
  }

}
