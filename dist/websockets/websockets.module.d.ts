import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { OnModuleInit } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
export declare class WebsocketsModule implements OnGatewayConnection, OnGatewayDisconnect, OnModuleInit {
    server: Server;
    private pubClient;
    private subClient;
    private chatRoom;
    onModuleInit(): Promise<void>;
    connectRedisDb(): Promise<void>;
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    handleSubscribeToRoom(room: string, client: Socket): void;
    handleUnsubscribeFromRoom(room: string, client: Socket): void;
    handleMessage(data: {
        room: string;
        sender: string;
        text: string;
    }, client: Socket): void;
    subscribeToRedisRoom(roomName: string): Promise<void>;
    publishMessage(room: any, sender: any, text: any): void;
}
