import { Router } from "express";
import { login } from "../controllers/authController";

const router = Router();

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Iniciar sesión en la aplicación
 *     description: Permite a un usuario autenticarse usando su correo electrónico y contraseña. Devuelve los datos del usuario y un token JWT para futuras solicitudes autenticadas.
 *     tags:
 *       - Auth
 *     security: [] 
 *     requestBody:
 *       description: Credenciales del usuario
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *                 description: Correo electrónico del usuario registrado
 *               password:
 *                 type: string
 *                 example: password123
 *                 description: Contraseña del usuario
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Login exitoso
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                       example: 1
 *                     email:
 *                       type: string
 *                       example: user@example.com
 *                     roleId:
 *                       type: number
 *                       example: 2
 *                     token:
 *                       type: string
 *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       400:
 *         description: Datos enviados incorrectos o faltantes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Datos inválidos
 *       401:
 *         description: Credenciales inválidas (usuario no encontrado o contraseña incorrecta)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Contraseña incorrecta
 */
router.post("/login", login);

export default router;
