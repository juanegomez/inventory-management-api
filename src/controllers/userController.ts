import { Request, Response } from 'express';
import { createUser } from '../services/userService';
import { createUserSchema } from '../schemas/userSchema';
import { ValidationError } from 'sequelize';

export const registerUser = async (req: Request, res: Response) => {
    try {
        // Validar con Zod
        const validatedData = createUserSchema.parse(req.body);

        const user = await createUser(validatedData);

        // Filtrar campos sensibles antes de enviar
        const { password, createdAt, updatedAt, ...userWithoutSensitive } = user.get({ plain: true });

        res.status(201).json({ message: "Usuario creado correctamente", user: userWithoutSensitive });
    } catch (error: any) {
        // Error de validación de Zod
        if (error?.issues) {
            return res.status(400).json({ message: "Datos inválidos", errors: error.issues });
        }

        // Error de Sequelize (por ejemplo unique, allowNull, etc.)
        if (error instanceof ValidationError) {
            const messages = error.errors.map(e => e.message);
            return res.status(400).json({ message: "Error de validación de base de datos", errors: messages });
        }

        // Otros errores
        res.status(400).json({ message: error.message });
    }
};
