import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    MessageBody,
    ConnectedSocket,
    OnGatewayConnection,
    OnGatewayDisconnect,
  } from '@nestjs/websockets';
  import { Server, Socket } from 'socket.io';
  import { RedisService } from '../redis/redis.service';
  
  @WebSocketGateway(3000,{
    cors: {
      origin: '*', // Allow all origins (or specify your frontend's URL)
    },
  })

  @WebSocketGateway()
  
  export class WebsocketsGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server: Server;
  
    constructor(private readonly redisService: RedisService) {}
    async handleConnection(client: Socket) {
      await this.redisService.publish('connection', `new connection established with this ${client.id}`);
    }
  
    async handleDisconnect(client: Socket) {
      console.log(`Client disconnected: ${client.id}`);
      await this.redisService.publish('connection', `Client disconnected with this ${client.id}`);
    }
  
    @SubscribeMessage('joinRoom')
    async handleJoinRoom(
      @MessageBody() data: { room: string },
      @ConnectedSocket() client: Socket,
    ) {
      const { room } = data;
      client.join(room);
      console.log("room");
      await this.redisService.publish('connection', `Client ${client.id} joined room ${room}`);
    }
  
    @SubscribeMessage('sendMessage')
    async handleMessage(
      @MessageBody() data: { room: string; sender: string; text: string },
      @ConnectedSocket() client: Socket,
    ) {
      const { room, sender, text } = data;
      this.server.to(room).emit('newMessage', { sender, text });
      await this.redisService.publish(room, { sender, text });
    }
  
    async listenForRedisMessages() {
      const subClient = this.redisService.getSubClient();
  
      subClient.subscribe('chat', (message) => {
        const parsedMessage = JSON.parse(message);
        console.log('Received Redis message:', parsedMessage);
  
        // Broadcast the message to the appropriate room
        this.server.to(parsedMessage.room).emit('message', parsedMessage);
      });
    }
  }
  