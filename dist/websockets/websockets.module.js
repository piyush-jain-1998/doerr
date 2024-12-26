"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebsocketsModule = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
let WebsocketsModule = class WebsocketsModule {
    handleConnection(client) {
        console.log(`Client connected: ${client.id}`);
    }
    handleDisconnect(client) {
        console.log(`Client disconnected: ${client.id}`);
    }
    handleSubscribeToRoom(room, client) {
        client.join(room);
        console.log(`Client ${client.id} subscribed to room: ${room}`);
    }
    handleUnsubscribeFromRoom(room, client) {
        client.leave(room);
        console.log(`Client ${client.id} unsubscribed from room: ${room}`);
    }
    handleMessage(data, client) {
        const { room, sender, text } = data;
        console.log(`Message received in room ${room}: ${text} from ${sender}`);
        this.server.to(room).emit('receiveMessage', { sender, text });
    }
};
exports.WebsocketsModule = WebsocketsModule;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], WebsocketsModule.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('subscribeToRoom'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], WebsocketsModule.prototype, "handleSubscribeToRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('unsubscribeFromRoom'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], WebsocketsModule.prototype, "handleUnsubscribeFromRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('sendMessage'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], WebsocketsModule.prototype, "handleMessage", null);
exports.WebsocketsModule = WebsocketsModule = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            cors: {
                origin: '*',
                methods: ['GET', 'POST'],
            }
        }
    })
], WebsocketsModule);
//# sourceMappingURL=websockets.module.js.map