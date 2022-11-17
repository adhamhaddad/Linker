import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import uuidv4 from 'uuid/v4';

const PROFILE_UPLOADS = 'uploads/profile-pictures';
const POST_UPLOADS = 'uploads/post-pictures';

const PROFILES_STORAGE = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, PROFILE_UPLOADS);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLocaleLowerCase().split(' ').join('-');
    cb(null, uuidv4() + '-' + fileName);
  }
});
const POSTS_STORAGE = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, POST_UPLOADS);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLocaleLowerCase().split(' ').join('-');
    cb(null, uuidv4() + '-' + fileName);
  }
});

export const profileUpload = multer({
  storage: PROFILES_STORAGE,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/jpeg'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg, .jpeg format allowed!'));
    }
  }
});

export const postUpload = multer({
  storage: POSTS_STORAGE,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/jpeg'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg, .jpeg format allowed!'));
    }
  }
});

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
