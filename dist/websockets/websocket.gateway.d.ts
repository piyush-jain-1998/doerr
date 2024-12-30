import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { RedisService } from '../redis/redis.service';
export declare class WebsocketsGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private readonly redisService;
    server: Server;
    constructor(redisService: RedisService);
    handleConnection(client: Socket): Promise<void>;
    handleDisconnect(client: Socket): Promise<void>;
    handleJoinRoom(data: {
        room: string;
    }, client: Socket): Promise<void>;
    handleMessage(data: {
        room: string;
        sender: string;
        text: string;
    }, client: Socket): Promise<void>;
    listenForRedisMessages(): Promise<void>;
}
