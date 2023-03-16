import { Component, OnInit } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { AppService } from "./app.service";
import { FootballDataService } from './football-data.service';
import { ISocketMessage } from "./interfaces/iSocketMessage";
import { GameWeek } from './models/gameWeek';
import { LeagueTable } from './models/leagueTable';
import { WebsocketService } from './websocket.service';
import { Socket } from 'ngx-socket-io';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [FootballDataService, WebsocketService]
})

export class AppComponent implements OnInit {
  public title: string = 'frontend';
  public helloMessage: string = ''
  public receivedMessages: Array<ISocketMessage> = []; //messages received from websockets
  public table!: LeagueTable;
  public gameweek: GameWeek[]=[];
  private conversationSubscription!: Subscription;


  constructor(
    private appService: AppService,private chatService: AppService,
    private footballData: FootballDataService, private wsService: WebsocketService, private socket: Socket
  ) {

  }

  ngOnInit() {
    console.log(_.chunk(['a', 'b', 'c', 'd'], 2)); //lodash function
    console.log(_.random(1, 100)); //lodash function

    this.conversationSubscription = this.appService
    .getConversations()
    .subscribe((conversations: GameWeek[]) => {
      console.log('conversations',conversations);
      this.gameweek=conversations;
      // this.conversations.push(conversations[0]); // Note: from mergeMap stream
      this.conversationSubscription.unsubscribe();
    });




  }




  getTable() {
    // this.footballData.getTable()
    //   .subscribe(
    //     (data:any) => {
    //       this.table = data;
    //       this.getFixtures(data.matchday);
    //     }
    //   );

    // this.wsService.subscribe(
    //   (msg:any) => {
    //     console.log(msg)
    //     // this.bitVavoWssData = msg;
    //   }
    //   , // Called whenever there is a message from the server.
    //   (err:any) => console.log(err), // Called if at any point WebSocket API signals some kind of error.
    //   () => console.log('complete') // Called when connection is closed (for whatever reason).
    // );

    // this.wsService.publish('scoreRoom').subscribe((result:any)=>{console.log(result)});


  }

  getFixtures(matchDay: number) {
    // this.footballData.getFixtures(matchDay).subscribe
    //   (
    //     (data:any) => this.gameweek = data
    //   );
  }

  ngOnDestroy(){
    // this.conversationSubscription.unsubscribe();
  }


}
