import { OnModuleInit } from '@nestjs/common';
export declare class RedisService implements OnModuleInit {
    private pubClient;
    private subClient;
    onModuleInit(): Promise<void>;
    getPubClient(): any;
    getSubClient(): any;
    publish(channel: string, message: any): Promise<void>;
    subscribe(channel: string, callback: (message: any) => void): Promise<void>;
}
