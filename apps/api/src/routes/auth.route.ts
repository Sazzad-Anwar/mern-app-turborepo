import { Router } from 'express';
import login from '../controllers/auth/login';

let authRoute: Router = Router();

authRoute.route('/login').post(login);

export default authRoute;
