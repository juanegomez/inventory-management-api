import { Request, Response, NextFunction } from 'express';

export const isClient = (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as { roleId: number };

    if (!user) return res.status(401).json({ message: 'No autenticado' });
    if (user.roleId !== 2) return res.status(403).json({ message: 'No autorizado, solo clientes' });

    next();
};
