import { Logger } from '@nestjs/common';
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger('WebSocketGateway');

  afterInit(server: Server) {
    this.logger.log('Gatway initialized!');
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Disconntected: ${client.id}`);
  }

  @SubscribeMessage('event')
  handleEvent(@MessageBody() data: any): void {
    // message should be broadcasted to all contected clients
    this.logger.log(`Data received and broadcasted: ${data}`);
    this.server.emit('event', data);
  }
}
