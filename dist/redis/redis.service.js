"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisService = void 0;
const common_1 = require("@nestjs/common");
const redis_1 = require("redis");
let RedisService = class RedisService {
    async onModuleInit() {
        this.pubClient = (0, redis_1.createClient)({
            socket: {
                host: 'redis-14156.c91.us-east-1-3.ec2.redns.redis-cloud.com',
                port: 14156,
                connectTimeout: 10000
            },
            username: 'default',
            password: 'mFCFtJe34soC1XJx5nTXijP1hY2IPcDR',
        });
        this.subClient = this.pubClient.duplicate();
        await Promise.all([this.pubClient.connect(), this.subClient.connect()]);
        console.log('Redis clients connected.');
    }
    getPubClient() {
        return this.pubClient;
    }
    getSubClient() {
        return this.subClient;
    }
    async publish(channel, message) {
        await this.pubClient.publish(channel, JSON.stringify(message));
    }
    async subscribe(channel, callback) {
        await this.subClient.subscribe(channel, (message) => {
            callback(JSON.parse(message));
        });
    }
};
exports.RedisService = RedisService;
exports.RedisService = RedisService = __decorate([
    (0, common_1.Injectable)()
], RedisService);
//# sourceMappingURL=redis.service.js.map