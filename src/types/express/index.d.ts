import { JwtPayload } from '../../middlewares/authHandler';

declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload;
        }
    }
}