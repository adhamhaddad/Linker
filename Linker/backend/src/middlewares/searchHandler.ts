import { Request, Response, NextFunction } from 'express';

const searchValidation = (req: Request, res: Response, next: NextFunction) => {
  try {
    const query: string = req.body.query;
    console.log(query);
  } catch (err) {
    return res.status(400).json({
      status: false,
      message: (err as Error).message
    });
  }
};
export default searchValidation;
