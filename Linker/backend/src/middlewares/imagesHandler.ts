import { Request, Response, NextFunction } from 'express';

export const createProfileImage = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const image = req.body.img;
  console.log(image);
  
  try {
    console.log(image);
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: (error as Error).message
    });
  }
};
export const createPostImage = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const image = req.body.image;
  try {
    console.log(image);
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: (error as Error).message
    });
  }
};
