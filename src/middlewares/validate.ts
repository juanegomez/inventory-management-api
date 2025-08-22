import { Request, Response, NextFunction } from 'express';
import { ZodObject, ZodRawShape } from 'zod';

export const validate = (schema: ZodObject<ZodRawShape>) => (req: Request, res: Response, next: NextFunction) => {
    try {
        schema.parse(req.body);
        next();
    } catch (error: any) {
        if (error?.issues) {
            return res.status(400).json({ message: 'Datos inválidos', errors: error.issues });
        }
        res.status(400).json({ message: error.message });
    }
};
