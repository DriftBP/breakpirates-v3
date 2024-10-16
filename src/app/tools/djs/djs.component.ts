import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { BreadcrumbConfigItem } from '../../shared/breadcrumb/breadcrumb-config-item';
import { toolsConfigInactive } from '../../shared/breadcrumb/breadcrumb-config';
import { BreadcrumbService } from '../../shared/services/breadcrumb/breadcrumb.service';
import { DjListComponent } from "./dj-list.component";

@Component({
  selector: 'bp-djs',
  templateUrl: './djs.component.html',
  imports: [
    TranslateModule,
    DjListComponent
],
  standalone: true
})
export class DjsComponent implements OnInit {
  private breadcrumbConfig: BreadcrumbConfigItem[] = [
    toolsConfigInactive,
    {
      name: 'DJS.TITLE',
      isActive: true
    }
  ];

  allDjs: string[] = [
    // A
    'Advance',
    'Abo',
    'Andy J',
    'Adam Freeland',
    'Ambush',
    'Armourer',
    'Andy KB',
    'Afterlife',
    // B
    'Breakz',
    'Bang-E',
    'Big Chris',
    'B-12',
    'Bad Intentionz',
    'Bigbyte',
    // C
    'Co-D',
    'Chance',
    'Charm',
    'Charm BOD',
    'Conrad',
    'Caution',
    'CK',
    'Condition Red',
    'Cheda',
    'Chewy',
    // D
    'Dave Skywalker',
    'Deluxe',
    'Drift',
    'D-Mix',
    'Dossa',
    'DLB',
    'Delite',
    'Dennean',
    'Darkus',
    'Dope',
    'D.Sully',
    'Don Gorgon',
    'Deman Rockers',
    'Dazz F',
    'Dom Physics',
    // E
    'Energiza',
    'Elusive',
    'Ess',
    'Euphoria',
    'E-Vade',
    'Easy D',
    // F
    'Flexa',
    'Flashback',
    'Faith',
    'Fav',
    'Fyrbeat',
    'Flair',
    'Flipside',
    // G
    'Genocide',
    'Garry Bynon',
    'Generic Bass',
    'Greedy',
    'Good 2 Bad & The Hugly',
    // H
    'Hijack',
    'Hoista',
    'Hughesee',
    'Haddock',
    // I
    'Ian Davy',
    'Ill Advised',
    'Inferno',
    'Insight',
    'ID',
    'In:vision',
    // J
    'Jacko',
    'Joey G',
    'Jay Cunning',
    'Jon SST',
    'Jow',
    'Jim K',
    'Jamie D',
    'Junk',
    'Jimmy',
    'J7',
    'Jedi',
    // K
    'Klusta',
    'Klimax',
    'KLM',
    'Kush D',
    'Kingsize',
    // L
    'Lynel Vynel',
    'LTJ Bukem',
    'Lien',
    'Louise Plusone',
    // M
    'Maxx Vinyl',
    'Moving Fusion',
    'Mr Wizzard',
    'Malaky',
    'Mr Bongo',
    'Makoto',
    'Moody',
    'MCS',
    'Monkeymind',
    'Mike E',
    'Mishmash',
    'Mark T',
    'Miguel',
    // N
    'NuMoniK',
    'Nunny',
    // O
    'Oneduz',
    // P
    'Prospect',
    'Penfold',
    'Paul Bassrock',
    'Phil The Bass',
    'Pilgrim',
    // R
    'Reflux',
    'Rollin',
    'Red Ewing',
    'RLS',
    'Rizzla',
    'Rapid',
    'Ravegirl',
    'Ravey Davey',
    'Robert Graff',
    'Richie K',
    'Robbie P',
    'Reckless',
    // S
    'Strongforce',
    'Sy Jones',
    'SDM',
    'SpaM',
    'Stu-E',
    'Scumble',
    'Shades Of Rhythm',
    'Stoopid',
    'Stevee Wonder',
    'Saltee',
    'Special ED',
    'Shocker',
    'Sike',
    'Scratchmaster',
    'SINergy',
    'Stuart J',
    'Stream',
    'Systec',
    'Shar-Pei',
    'Sav',
    // T
    'TRKKY',
    'Triple M',
    'Therinseman',
    'Top Buzz',
    'Tears Of Technology',
    'Trip',
    'Trubass',
    'Tempest',
    'Trax',
    'Tweezer',
    // U
    'Undadog',
    // V
    'Vibes',
    'VeNoM',
    'Vinyl Junkie',
    // W
    'Warped Kore',
    'Warrant',
    'Wink',
    'Waxkiller',
    // X
    'Xpander',
    'X-Ray',
    // Z
    'Zippy',
  ];

  djs: string[] = [];

  constructor(
    private readonly breadcrumbService: BreadcrumbService
  ) {
    this.djs = this.allDjs;
    this.djs.sort();
  }

  ngOnInit() {
    this.breadcrumbService.setBreadcrumb(this.breadcrumbConfig);
  }
}
