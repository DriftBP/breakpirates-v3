import { Component, } from '@angular/core';
import { AppSettings } from '../../app-settings';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
  ircServer = AppSettings.IRC_SERVER;
  ircPort = AppSettings.IRC_PORT;
  ircChannel = AppSettings.IRC_CHANNEL;

  chatUrl = 'http://chat.mk2k.net:6670?channels=' + AppSettings.IRC_CHANNEL;
}
