import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import path from 'path';

type MIME = {
  'image/png': string;
  'image/jpg': string;
  'image/jpeg': string;
};

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpg': 'jpg',
  'image/jpeg': 'jpeg'
};

export const fileUpload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      console.log(file);
      cb(null, 'uploads/images');
    },
    filename: (req, file, cb) => {
      console.log(file);
      const ext = file.mimetype;
      cb(null, 'adham' + '.' + ext);
    }
  }),
  fileFilter: (req, file, cb) => {
    let isValid: boolean = false;
    if (
      file.mimetype !== 'png' &&
      file.mimetype !== 'jpg' &&
      file.mimetype !== 'jpeg'
    ) {
      isValid = false;
    } else {
      isValid = true;
    }

    cb(null, isValid);
  }
});

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
