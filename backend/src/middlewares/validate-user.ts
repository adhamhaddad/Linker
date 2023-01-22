import { Request, Response, NextFunction } from 'express';
import { check, validationResult } from 'express-validator';

export const signupValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

export const signinValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (check('email').isEmail().withMessage('Email is not valid')) {
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      status: false,
      message: errors.array()[0].msg
    });
  }
  next();
};
