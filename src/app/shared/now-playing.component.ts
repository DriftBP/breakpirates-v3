import { Component, OnInit } from '@angular/core';

import { Show } from './../schedule/show';
import { ScheduleService } from './../schedule/schedule.service';

@Component({
    selector: 'bp-now-playing',
    templateUrl: './now-playing.component.html'
})
export class NowPlayingComponent implements OnInit {

    constructor(
        private scheduleService: ScheduleService
    ) { }

    nowPlaying: Show;

    isLiveShow(): boolean {
        return this.nowPlaying !== undefined && this.nowPlaying.id !== undefined;
    }

    getNowPlaying(): void {
        this.scheduleService.getNowPlaying()
            .subscribe(nowPlaying => this.nowPlaying = nowPlaying)
    }

    ngOnInit() {
        this.getNowPlaying();
    }

}
