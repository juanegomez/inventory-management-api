// src/routes/index.ts
import express, { Application } from 'express';

import authRouter from './auth';
import userRouter from './userRouter';
import productRouter from './productRouter';
import purchaseRouter from './purchaseRouter';

export function routerApi(app: Application) {
    const router = express.Router();

    app.use('/api', router);

    router.use('/auth', authRouter);
    router.use('/user', userRouter);
    router.use('/products', productRouter);
    router.use('/purchases', purchaseRouter);
}
