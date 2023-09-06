import { Request, Response, NextFunction } from "express";
import {sanitize} from 'dompurify';

export const sanitizeInput = (req: Request, res: Response, next: NextFunction): void => {
    // Sanitize the request body
    if (req.body) {
        for (let key in req.body) {
            req.body[key] = sanitize(req.body[key]);
        }
    }

    next();
}
