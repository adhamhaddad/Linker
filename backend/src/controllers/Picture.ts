import { Request, Response, NextFunction, Application } from 'express';
import { profileUpload } from '../middlewares/imagesHandler';
import verifyToken from '../middlewares/verifyToken';
import Picture from '../models/Picture';

const picture = new Picture();

const createProfile = async (req: Request, res: Response) => {
  const image = {
    user_id: req.body.user_id as string,
    profile_picture: req.file?.path as string
  };
  try {
    const response = await picture.createPicture(image);
    res.status(201).json({
      status: true,
      data: { ...response },
      message: 'Profile added successfully!'
    });
  } catch (err) {
    res.status(201).json({
      status: false,
      message: (err as Error).message
    });
  }
};

const getProfile = async (req: Request, res: Response) => {
  try {
    const response = await picture.getPicture(req.query.username as string);
    res.status(201).json({
      status: true,
      data: { ...response },
      message: 'Profile received successfully!'
    });
  } catch (err) {
    res.status(201).json({
      status: false,
      message: (err as Error).message
    });
  }
};

const updateProfile = async (req: Request, res: Response) => {
  const image = {
    user_id: req.body.user_id as string,
    profile_picture: req.file?.path as string
  };
  try {
    const response = await picture.updatePicture(image);
    res.status(201).json({
      status: true,
      data: { ...response },
      message: 'Profile added successfully!'
    });
  } catch (err) {
    res.status(201).json({
      status: false,
      message: (err as Error).message
    });
  }
};

const deleteProfile = async (req: Request, res: Response) => {
  try {
    const response = await picture.createPicture(req.body);
    res.status(201).json({
      status: true,
      data: { ...response },
      message: 'Profile added successfully!'
    });
  } catch (err) {
    res.status(201).json({
      status: false,
      message: (err as Error).message
    });
  }
};

const profile_controller_routes = (app: Application, logger: NextFunction) => {
  app.patch(
    '/profile-picture',
    logger,
    verifyToken,
    profileUpload.single('profile'),
    updateProfile
  );
  app.get('/profile-picture', logger, verifyToken, getProfile);
  app.delete('/profile-picture', logger, verifyToken, deleteProfile);
};
export default profile_controller_routes;
