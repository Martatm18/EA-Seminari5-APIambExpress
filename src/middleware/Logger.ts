import { NextFunction, Request, Response } from 'express';
import Logging from '../library/Logging';

export const Logger = (req: Request, res: Response, next: NextFunction) => {
    Logging.info(`Incoming - METHOD: [${req.method}] - URL: [${req.originalUrl}] - IP: [${req.socket.remoteAddress}]`);

    res.on('finish', () => {
        Logging.info(`Result - METHOD: [${req.method}] - URL: [${req.originalUrl}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`);
    });

    next();
};

export default Logger;
