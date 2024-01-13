import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

/**
 * Middleware de autenticación para verificar el token JWT en las solicitudes.
 * Si el token es válido, almacena el ID del usuario en `res.locals.userId`.
 *
 * @param {Request} req - Objeto de solicitud de Express.
 * @param {Response} res - Objeto de respuesta de Express.
 * @param {NextFunction} next - Función para pasar el control al siguiente middleware.
 */
export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).send('Access denied. No token provided.');
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any;
        res.locals.userId = decoded.id;
        next();
    } catch (error) {
        res.status(400).send('Invalid token.');
    }
};
