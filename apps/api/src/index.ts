import { createServer } from './server';
// import { log } from 'logger';
import { Server } from 'http';
import authRoute from './routes/auth.route';

// eslint-disable-next-line turbo/no-undeclared-env-vars
const port = process.env.API_PORT || 5001;
const app = createServer();

app.use('/auth', authRoute);

let server: Server = app.listen(port, () => console.log(`Api server is running on ${port}`));
