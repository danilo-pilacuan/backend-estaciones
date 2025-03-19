import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
      origin: '*',
  },
})
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  // Usamos un Map que almacena un Set de sockets por customId
  public clients: Map<string, Set<Socket>> = new Map();

  handleConnection(client: Socket) {
      const customId = client.handshake.query.customId as string;

      if (!this.clients.has(customId)) {
          this.clients.set(customId, new Set());
      }

      const clientsSet = this.clients.get(customId);
      clientsSet?.add(client);

      client.on('disconnect', () => this.handleDisconnect(client));

      console.log(`Client connected with custom ID: ${customId}`);
  }

  handleDisconnect(client: Socket) {
      const customId = client.data.customId;

      if (this.clients.has(customId)) {
          const clientsSet = this.clients.get(customId);
          clientsSet?.delete(client);

          // Remove the entry if no clients remain for this customId
          if (clientsSet?.size === 0) {
              this.clients.delete(customId);
          }
      }

      console.log(`Client disconnected with custom ID: ${customId}`);
  }

  emitToClient(customId: string, event: string, data: any) {
      console.log('Emitting to ' + customId);

      if (this.clients.has(customId)) {
          const clientsSet = this.clients.get(customId);
          clientsSet?.forEach(client => {
              if (client.connected) {
                  client.emit(event, data);
                  console.log(`Emitted event: ${event} to client with custom ID: ${customId}`);
              } else {
                  console.log(`Client with custom ID: ${customId} is not connected`);
              }
          });
      } else {
          console.log(`No clients with custom ID: ${customId}`);
      }
  }
}
