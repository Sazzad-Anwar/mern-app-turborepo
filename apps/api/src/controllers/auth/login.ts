import { Request, Response } from 'express';
import createError from 'http-errors';
import { z } from 'zod';
import { fromZodError } from 'zod-validation-error';

const loginDTO = z
    .object({
        email: z.string().email(),
        password: z.string().min(6, 'password should be 6 characters at least'),
        user: z.string(),
        role: z.enum(['user', 'seller', 'buyer']),
    })
    .strict();

let login = async (req: Request, res: Response) => {
    const authDTO = loginDTO.safeParse(req.body);
    if (authDTO.success) {
        res.json(authDTO);
    } else {
        res.status(422).json({ error: fromZodError(authDTO.error) });
    }
};

export default login;
