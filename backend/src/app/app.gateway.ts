import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';

import { GamesService } from "../games/games.service";
import { Game } from "../games/Game";
import { IGameUpdate } from "../games/iGameUpdate";
import { Socket } from 'socket.io';
import { Subscription } from 'rxjs';

// @WebSocketGateway(3008,{ transports: ['websocket'], cors: true })
@WebSocketGateway({ cors: { origin: ['http://localhost:4200'] } })
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {
  @WebSocketServer() private server;
  private clientList = [];

  constructor(private gamesService: GamesService) { }

  afterInit() {
    /**
     * generates and broadcasts in-game events
     */
    const doGameEvents = () => {
      for (let game of this.gamesService.games.filter((game: Game) => {
        return !game.ended();
      })) {
        let randomUpdate = this.gamesService.generateRandomGameUpdate(game);

        if (randomUpdate) {
          this.broadcast(randomUpdate);
        }
      }
    }

    /**
     * broadcasts game-end events
     */
    const doGameEndEvents = () => {
      for (let game of this.gamesService.games.filter((game: Game) => {
        return game.ended() && !game.getEndNotified();
      })) {
        this.broadcast(<IGameUpdate>{ type: 'gameEnd', timestamp: new Date(), gameState: game });
        game.setEndNotified(true);
      }
    }

    setInterval(doGameEndEvents, 500);
    setInterval(doGameEvents, 500);
  }

  /**
   * entry point for socket connection
   * @param client
   * @param args
   */
  handleConnection(client: any, ...args: any[]): any {
    this.clientList.push(client);
    client.join('scoreRoom');
    client.emit('scoreRoom', this.gamesService.games);
  }

  /**
   * reached when socket client disconnects
   * @param client
   */
  handleDisconnect(client: any): any {
    for (let i = 0; i < this.clientList.length; i++) {
      if (this.clientList[i] === client) {
        this.clientList.splice(i, 1);
        break;
      }
    }
    client.disconnect();
  }

  /**
   * sends a payload to all connected clients
   * @param payload
   * @private
   */

  private broadcast(payload: any) {
    for (let client of this.clientList) {
      client.emit('scoreRoom', payload);
    }
  }

  // getConversations(socket: Socket, userId: number): Subscription {
  //   return this.conversationService
  //     .getConversationsWithUsers(userId)
  //     .subscribe((conversations) => {
  //       this.server.to(socket.id).emit('scoreRoom', conversations);
  //     });
  // }


}
