import { Injectable } from '@angular/core';
import { Observable, Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { IHelloMessage } from "./interfaces/iHelloMessage";
import { ISocketMessage } from "./interfaces/iSocketMessage";
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { ChatSocketService } from './chat-socket.service';
import { FootballDataService } from './football-data.service';


@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(
    private httpClient: HttpClient, private socket: FootballDataService
  ) { }


  getConversations(): Observable<any[]> {
    return this.socket.fromEvent<any[]>('scoreRoom');
  }
  getLiveScore(): Observable<any> {
    return this.socket.fromEvent<any[]>('scoreRoom');
  }


}
