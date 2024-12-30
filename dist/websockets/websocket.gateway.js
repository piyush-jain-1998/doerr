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
exports.WebsocketsGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const redis_service_1 = require("../redis/redis.service");
let WebsocketsGateway = class WebsocketsGateway {
    constructor(redisService) {
        this.redisService = redisService;
    }
    async handleConnection(client) {
        await this.redisService.publish('connection', `new connection established with this ${client.id}`);
    }
    async handleDisconnect(client) {
        console.log(`Client disconnected: ${client.id}`);
        await this.redisService.publish('connection', `Client disconnected with this ${client.id}`);
    }
    async handleJoinRoom(data, client) {
        const { room } = data;
        client.join(room);
        console.log("room");
        await this.redisService.publish('connection', `Client ${client.id} joined room ${room}`);
    }
    async handleMessage(data, client) {
        const { room, sender, text } = data;
        this.server.to(room).emit('newMessage', { sender, text });
        await this.redisService.publish(room, { sender, text });
    }
    async listenForRedisMessages() {
        const subClient = this.redisService.getSubClient();
        subClient.subscribe('chat', (message) => {
            const parsedMessage = JSON.parse(message);
            console.log('Received Redis message:', parsedMessage);
            this.server.to(parsedMessage.room).emit('message', parsedMessage);
        });
    }
};
exports.WebsocketsGateway = WebsocketsGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], WebsocketsGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('joinRoom'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], WebsocketsGateway.prototype, "handleJoinRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('sendMessage'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], WebsocketsGateway.prototype, "handleMessage", null);
exports.WebsocketsGateway = WebsocketsGateway = __decorate([
    (0, websockets_1.WebSocketGateway)(3000, {
        cors: {
            origin: '*',
        },
    }),
    (0, websockets_1.WebSocketGateway)(),
    __metadata("design:paramtypes", [redis_service_1.RedisService])
], WebsocketsGateway);
//# sourceMappingURL=websocket.gateway.js.map