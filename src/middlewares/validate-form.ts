import { Request, Response, NextFunction } from "express";

// Register
export  async function register(req: Request, res: Response, next: NextFunction): Promise<unknown> {
    try {
        const username = await req.body.username;
        const email = await req.body.email;
        const password = await req.body.pass;
        const check = await req.body.check;
        const sex = await req.body.sex;

        if (username !== 'adhamhaddad' && password !== 'adham123') {
            console.log(username, email, password, sex, check);
            next();
        } else {
            return res.send('username already exist!');
        }
    } catch (err) {
        throw new Error(`Could not register. Error ${err}`);
    }
}

export async function login(req: Request, res: Response, next: NextFunction): Promise<unknown> {    
    try {
        const username = await req.body.username;
        const password = await req.body.pass;
        const check = await req.body.check;

        if (username === 'adhamhaddad' && password === 'adham123') {
            console.log(username, password, check);
            next();
        } else {
            return res.send('username or password wrong.');
        }
    } catch (err) {
        throw new Error(`Could not register. Error ${err}`);
    }
}