import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';

const PROFILE_PIC = path.join(
  __dirname,
  '..',
  '..',
  'uploads/profile-pictures'
);
const POST_PIC = path.join(__dirname, '..', '..', 'uploads/post-pictures');
const POST_VID = path.join(__dirname, '..', '..', 'uploads/post-videos');

export const checkProfile = (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  fs.access(PROFILE_PIC, (err) => {
    if (err) {
      fs.mkdir(path.join(__dirname, '..', '..', 'uploads'), (err) => {
        if (err) {
          return res.status(500).json({
            status: false,
            message: err
          });
        }
        fs.mkdir(PROFILE_PIC, (err) => {
          if (err) {
            return res.status(500).json({
              status: false,
              message: err
            });
          }
          next();
        });
      });
    }
  });
};

export const checkPostPic = (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  fs.access(POST_PIC, (err) => {
    if (err) {
      fs.mkdir(POST_PIC, (err) => {
        if (err) {
          return res.status(500).json({
            status: false,
            message: err
          });
        }
      });
    }
    next();
  });
};

export const checkPostVid = (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  fs.access(POST_VID, (err) => {
    if (err) {
      fs.mkdir(POST_VID, (err) => {
        if (err) {
          return res.status(500).json({
            status: false,
            message: err
          });
        }
      });
    }
    next();
  });
};
