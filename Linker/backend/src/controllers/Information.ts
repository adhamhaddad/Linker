import { Request, Response, NextFunction, Application } from 'express';
import { createProfileImage } from '../middlewares/imagesHandler';
import verifyToken from '../middlewares/verifyToken';
import Information from '../models/Information';

const info = new Information();

const createInfo = async (req: Request, res: Response) => {
  try {
    const response = await info.createInfo(req.body, req.body.user_id);
    res.status(201).json({
      status: true,
      data: { ...response },
      message: 'information created successfully!'
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: (err as Error).message
    });
  }
};

const getInfo = async (req: Request, res: Response) => {
  try {
    const response = await info.getInfo(req.query.user_id as string);
    res.status(200).json({
      status: true,
      data: { ...response },
      message: 'Retrieved the information successfully!'
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: (err as Error).message
    });
  }
};

const deleteInfo = async (req: Request, res: Response) => {
  try {
    await info.deleteInfo(req.params.id);
    res.status(200).json({
      status: true,
      message: 'Information deleted successfully!'
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: (err as Error).message
    });
  }
};

const updateFname = async (req: Request, res: Response) => {
  try {
    const response = await info.updateFname(req.body);
    res.status(201).json({
      status: true,
      data: { ...response },
      message: 'First name updated successfully!'
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: (err as Error).message
    });
  }
};

const updateLname = async (req: Request, res: Response) => {
  try {
    const response = await info.updateLname(req.body);
    res.status(201).json({
      status: true,
      data: { ...response },
      message: 'Last name updated successfully!'
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: (err as Error).message
    });
  }
};

const updateProfile = async (req: Request, res: Response) => {
  try {
    const response = await info.updateProfile(req.body);
    res.status(201).json({
      status: true,
      data: { ...response },
      message: 'Profile picture uploaded successfully!'
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: (err as Error).message
    });
  }
};
const updateStory = async (req: Request, res: Response) => {
  try {
    const response = await info.updateStory(req.body);
    res.status(201).json({
      status: true,
      data: { ...response },
      message: 'Story uploaded successfully!'
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: (err as Error).message
    });
  }
};

const information_controller_routes = (
  app: Application,
  logger: NextFunction
) => {
  app.post('/user/information', logger, verifyToken, createInfo);
  app.get('/user/information', logger, verifyToken, getInfo);
  app.delete('/user/information', logger, verifyToken, deleteInfo);

  app.patch('/user/information/fname', logger, verifyToken, updateFname);
  app.patch('/user/information/lname', logger, verifyToken, updateLname);
  app.patch(
    '/user/information/profile-image',
    logger,
    verifyToken,
    createProfileImage,
    updateProfile
  );
  app.patch('/user/information/story', logger, verifyToken, updateStory);
};
export default information_controller_routes;
