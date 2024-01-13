import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).send('Access denied. No token provided.');
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any;
        res.locals.userId = decoded.id; // Almacenar el ID del usuario en res.locals
        next();
    } catch (error) {
        res.status(400).send('Invalid token.');
    }
};