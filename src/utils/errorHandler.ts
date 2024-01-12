import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).send({ error: err.message });
};

export const handleErrorResponse = (error: unknown, res: Response, statusCode: number = 500) => {
    if (error instanceof Error) {
        res.status(statusCode).send({ error: error.message });
    } else {
        res.status(statusCode).send({ error: 'An unknown error occurred' });
    }
};