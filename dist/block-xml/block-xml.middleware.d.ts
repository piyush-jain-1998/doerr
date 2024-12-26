import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
export declare class BlockXmlMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction): void;
}
