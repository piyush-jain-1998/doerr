import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
export declare class WebsocketsModule implements OnGatewayConnection, OnGatewayDisconnect {
    server: Server;
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    handleSubscribeToRoom(room: string, client: Socket): void;
    handleUnsubscribeFromRoom(room: string, client: Socket): void;
    handleMessage(data: {
        room: string;
        sender: string;
        text: string;
    }, client: Socket): void;
}
