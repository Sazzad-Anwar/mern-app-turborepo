import { json, urlencoded, Application, Request, Response } from 'express';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

export const createServer = () => {
    const app: Application = express();
    app.disable('x-powered-by')
        .use(morgan('dev'))
        .use(urlencoded({ extended: true }))
        .use(json())
        .use(cors())
        .get('/', (req: Request, res: Response) => {
            return res.json({ message: `App is running! on ${process.env.NODE_ENV}` });
        });

    return app;
};
