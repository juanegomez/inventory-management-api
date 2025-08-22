// src/services/userService.ts
import bcrypt from 'bcrypt';
import { User } from "../database/models";
import { CreateUserInput } from '../schemas/userSchema';

export const createUser = async (data: CreateUserInput) => {
    // Verificar si ya existe usuario con ese email
    const existingUser = await User.findOne({ where: { email: data.email } });
    if (existingUser) throw new Error("El usuario ya existe");

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const newUser = await User.create({
        ...data,
        password: hashedPassword
    });

    return newUser;
};
