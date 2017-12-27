import { Component, OnInit } from '@angular/core';
import { TuneInService } from '../../tune-in/tune-in.service';

@Component({
  selector: 'bp-navigation',
  templateUrl: './navigation.component.html'
})
export class NavigationComponent implements OnInit {

  constructor(
    private tuneInService: TuneInService
  ) { }

  archiveUrl: string;

  ngOnInit() {
    this.archiveUrl = this.tuneInService.archiveUrl;
  }

}
