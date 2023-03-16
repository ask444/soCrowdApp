import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WebsocketService {
	websocket$: any;
	// documents = this.socket.fromEvent<string[]>('scoreRoom');
	message = new BehaviorSubject<string>('');
	connection = new BehaviorSubject<string>('');


	constructor(private socket: Socket) {
	}

	getScoreRoom() {
		this.socket.emit('scoreRoom');
	  }




}
