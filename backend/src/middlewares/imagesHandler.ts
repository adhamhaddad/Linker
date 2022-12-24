import multer from 'multer';
import uuidv4 from 'uuid/v4';

const PROFILE_UPLOADS = 'uploads/profile-pictures';
const POST_UPLOADS = 'uploads/post-pictures';
const REPLY_UPLOADS = 'uploads/replies-pictures';
const COMMENT_UPLOADS = 'upload/comments-pictures';

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

const REPLY_STORAGE = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, REPLY_UPLOADS);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLocaleLowerCase().split(' ').join('-');
    cb(null, uuidv4() + '-' + fileName);
  }
});

const COMMENT_STORAGE = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, COMMENT_UPLOADS);
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

export const commentUpload = multer({
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

export const replyUpload = multer({
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
