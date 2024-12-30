import { Request } from 'express';
export declare class AppController {
    constructor();
    handleMessage(data: any): void;
    getCurrentUrl(req: Request): string;
}
