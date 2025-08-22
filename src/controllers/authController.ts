import { Request, Response } from "express";
import { loginUser } from "../services/authService";

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const result = await loginUser(email, password);
        return res.json({ message: "Login exitoso", user: result });
    } catch (error: any) {
        return res.status(401).json({ message: error.message });
    }
};
