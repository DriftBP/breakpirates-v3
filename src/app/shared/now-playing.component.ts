import { Component, OnInit } from '@angular/core';

import { Show } from './../schedule/show';
import { ScheduleService } from './../schedule/schedule.service';

@Component({
    selector: 'now-playing',
    templateUrl: './now-playing.component.html'
})
export class NowPlaying implements OnInit {

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
