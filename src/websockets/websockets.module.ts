  import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    cors: {
      origin: '*', // Allow all origins
      methods: ['GET', 'POST'], // Optional: Define allowed methods
    }}
})
export class WebsocketsModule implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  // Client subscribes to a specific room
  @SubscribeMessage('subscribeToRoom')
  handleSubscribeToRoom(
    @MessageBody() room: string,
    @ConnectedSocket() client: Socket,
  ) {
    client.join(room); // Add the client to the specified room
    console.log(`Client ${client.id} subscribed to room: ${room}`);
  }

  // Client unsubscribes from a specific room
  @SubscribeMessage('unsubscribeFromRoom')
  handleUnsubscribeFromRoom(
    @MessageBody() room: string,
    @ConnectedSocket() client: Socket,
  ) {
    client.leave(room); // Remove the client from the specified room
    console.log(`Client ${client.id} unsubscribed from room: ${room}`);
  }

  // Send a message only to a specific room
  @SubscribeMessage('sendMessage')
  handleMessage(
    @MessageBody() data: { room: string; sender: string; text: string },
    @ConnectedSocket() client: Socket,
  ) {
    const { room, sender, text } = data;
    console.log(`Message received in room ${room}: ${text} from ${sender}`);
    this.server.to(room).emit('receiveMessage', { sender, text }); // Send message only to the room
  }
}

  