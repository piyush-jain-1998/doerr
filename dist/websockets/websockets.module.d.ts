import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
import { OnModuleInit } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
export declare class WebsocketsModule implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect, OnModuleInit {
    server: Server;
    private pubClient;
    private subClient;
    private chatRoom;
    afterInit(): Promise<void>;
    onModuleInit(): Promise<void>;
    connectRedisDb(): Promise<void>;
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    handleSubscribeToRoom(room: string, client: Socket): Promise<void>;
    handleUnsubscribeFromRoom(room: string, client: Socket): void;
    handleMessage(data: {
        room: string;
        sender: string;
        text: string;
    }, client: Socket): void;
    subscribeToRedisRoom(): Promise<void>;
    publishMessage(room: string, sender: string, text: string): void;
}
