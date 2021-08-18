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
   
@WebSocketGateway()
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private logger: Logger = new Logger('AppGateway');
  @WebSocketServer() server: Server;
   
  @SubscribeMessage('event.interaction')
  handleInteractionMessage(client: Socket, payload: string): void {
    this.logger.log(payload)
  }

  @SubscribeMessage('event.error')
  handleerrorMessage(client: Socket, payload: string): void {
    this.logger.log(payload)
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