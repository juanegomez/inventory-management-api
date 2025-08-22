import express, { Application } from 'express';
import cors from 'cors';
import { routerApi } from './routes';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger';

const whitelist = [
    'http://localhost:3000',
];

const corsOptions = {
    origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
        if (origin && whitelist.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('no permitido'));
        }
    },
};

const app: Application = express();
const port: number = Number(process.env.PORT) || 3000;

app.use(cors(corsOptions));
app.use(express.json({ limit: '50mb' }));
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rutas
routerApi(app);

// Middlewares de errores
// app.use(logErrors);
// app.use(ormErrorHandler);
// app.use(boomErrorHandler);
// app.use(errorHandler);

app.listen(port, () => {
    console.log('My port: ' + port);
});
