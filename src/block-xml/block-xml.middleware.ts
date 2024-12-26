import { Injectable, NestMiddleware, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class BlockXmlMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Check Content-Type header for XML
    if (req.headers['content-type']?.includes('xml')) {
      throw new HttpException(
        'XML requests are not supported',
        HttpStatus.BAD_REQUEST,
      );
    }

    // Allow other requests
    next();
  }
}
