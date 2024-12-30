import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import { createClient } from 'redis';

@Injectable()
@WebSocketGateway(3000, {
  cors: {
    origin: '*', // Allow all origins, adjust for production
  },
})
export class WebsocketsModule implements OnGatewayConnection, OnGatewayDisconnect, OnModuleInit {
  @WebSocketServer() server: Server;
  private pubClient: any;
  private subClient: any;

  private chatRoom: string;

  async onModuleInit() {
    await this.connectRedisDb();
  }

  async connectRedisDb() {
    this.pubClient = createClient({
      socket: {
        host: 'redis-14156.c91.us-east-1-3.ec2.redns.redis-cloud.com', // Replace with your Redis host
        port: 14156, // Replace with your Redis port
      },
      username: 'default', // Optional if Redis ACL is enabled
      password: 'mFCFtJe34soC1XJx5nTXijP1hY2IPcDR', // Replace with your Redis password
    });

    this.pubClient.on('error', (err) => {
      console.error('Redis connection error:', err.message);
    });
    this.subClient = this.pubClient.duplicate();

    await Promise.all([this.pubClient.connect(), this.subClient.connect()]);

    this.server.adapter(createAdapter(this.pubClient, this.subClient));
    console.log('Redis connected and Socket.IO server initialized');
    this.pubClient.publish('connectInRedis',  `new connection establised`);

  }

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
    this.pubClient.publish('connectInRedis',  `Client connected: ${client.id}`);
    this.pubClient.publish('do',  `new Connecton`);
    this.publishMessage('do','backend',"hello world")
    this.subscribeToRedisRoom("*");
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
    this.chatRoom = room;
    client.join(room);
    this.pubClient.publish(room,  `Client ${client.id} subscribed to room: ${room}`);

  }

  // Client unsubscribes from a specific room
  @SubscribeMessage('unsubscribeFromRoom')
  handleUnsubscribeFromRoom(
    @MessageBody() room: string,
    @ConnectedSocket() client: Socket,
  ) {
    client.leave(room);
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
    this.pubClient.publish(room, JSON.stringify({sender, text}));
  }

  // Subscribe to Redis messages for a specific room
  async subscribeToRedisRoom(roomName: string) {
    this.subClient.subscribe(this.chatRoom, (message: string) => {
      console.log(`Message received in room ${roomName} from Redis: ${message}`);
    });
  }

  publishMessage(room,sender,text){
    this.pubClient.publish(room, JSON.stringify({sender, text}));
  }
  // Publish a message to a specific Redis channel/room
}
