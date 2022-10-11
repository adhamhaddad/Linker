import { Request, Response, NextFunction } from 'express';

// Register

export const register = (req: Request, res: Response, next: NextFunction) => {
  try {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const gender = req.body.gender;
    const checked = req.body.checked;
    // Email Validation
    if (!(email.trim().length >= 5) && !email.trim().includes('@')) {
      return res.status(400).json({
        status: false,
        message: 'Email is not valid'
      });
    }
    if (
      username.trim().length >= 5 &&
      password.trim().length >= 8 &&
      gender.trim().length > 0
    ) {
      console.log(username, email, password, gender, checked);
      next();
    } else {
      return res.send('username already exist!');
    }
  } catch (err) {
    throw new Error(`Could not register. Error ${(err as Error).message}`);
  }
};
// Login
export const login = (req: Request, res: Response, next: NextFunction) => {
  try {
    const username = req.body.username;
    const password = req.body.pass;
    const checked = req.body.checked;

    if (
      username.trim().length >= 5 &&
      password.trim().length >= 8 &&
      checked == true
    ) {
      next();
    } else {
      return res.status(400).json({
        status: false,
        message: 'Username or password not valid.'
      });
    }
  } catch (err) {
    throw new Error(`Could not login. Error ${(err as Error).message}`);
  }
};
