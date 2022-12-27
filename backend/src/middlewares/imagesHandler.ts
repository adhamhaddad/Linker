import multer from 'multer';
import uuidv4 from 'uuid/v4';

const PROFILE_UPLOADS = 'uploads/profile-pictures';
const POST_PIC_UPLOADS = 'uploads/post-pictures';
const POST_VID_UPLOADS = 'uploads/post-videos';
const REPLY_UPLOADS = 'uploads/replies-pictures';
const COMMENT_UPLOADS = 'uploads/comments-pictures';

const PROFILES_STORAGE = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, PROFILE_UPLOADS);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLocaleLowerCase().split(' ').join('-');
    cb(null, uuidv4() + '-' + fileName);
  }
});

const POSTS_PIC_STORAGE = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, POST_PIC_UPLOADS);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLocaleLowerCase().split(' ').join('-');
    cb(null, uuidv4() + '-' + fileName);
  }
});

const POSTS_VID_STORAGE = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, POST_VID_UPLOADS);
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
// Profile Upload
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

// Post Picture Upload
export const postPicUpload = multer({
  storage: POSTS_PIC_STORAGE,
  fileFilter: (req, file, cb) => {
    console.log(file.mimetype);
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
// Post Video Upload
export const postVidUpload = multer({
  storage: POSTS_VID_STORAGE,
  fileFilter: (req, file, cb) => {
    console.log(file.mimetype);
    console.log('Uploading ...');
    if (
      file.mimetype === 'video/mp4' ||
      file.mimetype === 'video/webp' ||
      file.mimetype === 'video/mov'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .mp4, .webp, mov format allowed!'));
    }
  }
});

// export const commentUpload = multer({
//   storage: POSTS_STORAGE,
//   fileFilter: (req, file, cb) => {
//     if (
//       file.mimetype === 'image/png' ||
//       file.mimetype === 'image/jpg' ||
//       file.mimetype === 'image/jpeg'
//     ) {
//       cb(null, true);
//     } else {
//       cb(null, false);
//       return cb(new Error('Only .png, .jpg, .jpeg format allowed!'));
//     }
//   }
// });

// export const replyUpload = multer({
//   storage: POSTS_STORAGE,
//   fileFilter: (req, file, cb) => {
//     if (
//       file.mimetype === 'image/png' ||
//       file.mimetype === 'image/jpg' ||
//       file.mimetype === 'image/jpeg'
//     ) {
//       cb(null, true);
//     } else {
//       cb(null, false);
//       return cb(new Error('Only .png, .jpg, .jpeg format allowed!'));
//     }
//   }
// });
