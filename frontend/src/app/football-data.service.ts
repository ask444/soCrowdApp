
import { Injectable } from '@angular/core';

import { SocketIoConfig, Socket } from 'ngx-socket-io';

const config: SocketIoConfig = {
  url: 'http://localhost:3000',
  options: {},
};

@Injectable({
  providedIn: 'root',
})
export class FootballDataService extends Socket {
  constructor() {
    super(config);
  }
}
