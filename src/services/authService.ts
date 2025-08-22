import { User } from "../database/models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface LoginResponse {
    id: number;
    email: string;
    roleId: number;
    token: string;
}

export const loginUser = async (email: string, password: string): Promise<LoginResponse> => {
    const user = await User.findOne({ where: { email } });
    if (!user) throw new Error("Usuario no encontrado");

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new Error("Contraseña incorrecta");

    const token = jwt.sign(
        { id: user.id, roleId: user.roleId },
        process.env.JWT_SECRET || "secret",
        { expiresIn: "1d" }
    );

    return { id: user.id, email: user.email, roleId: user.roleId, token };
};
