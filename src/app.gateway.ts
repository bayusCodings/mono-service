import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import path from 'path';
import fs from 'fs';
   
@WebSocketGateway()
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private logger: Logger = new Logger('AppGateway');
  @WebSocketServer() server: Server;
   
  @SubscribeMessage('event.interaction')
  handleInteractionMessage(client: Socket, payload: string): void {
    const content = payload + '\r\n'
    fs.open(path.join(__dirname, '..', './resources/interactions.txt'), 'a', 666, function( e, id ) {
      fs.write( id, content + '\r\n', null, 'utf8', function(){
        fs.close(id, () => {})
      })
    })
  }

  @SubscribeMessage('event.error')
  handleErrorMessage(client: Socket, payload: string): void {
    const content = payload + '\r\n'
    fs.open(path.join(__dirname, '..', './resources/errors.txt'), 'a', 666, function( e, id ) {
      fs.write( id, content + '\r\n', null, 'utf8', function(){
        fs.close(id, () => {});
      })
    })
  }
   
  afterInit(server: Server) {
   this.logger.log('Init');
  }
   
  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }
   
  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }
}