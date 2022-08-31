import { Request, Response, NextFunction, Application } from 'express';
import Photos from '../models/Photos';

const photo = new Photos();

const uploadPhoto = async (req: Request, res: Response) => {
  try {
    const response = await photo.uploadPhoto(req.body, req.params.id);
    res.status(201).json({
      status: true,
      data: { ...response },
      message: 'Photo uploaded successfully!'
    });
  } catch (err) {
    res.status(401).json({
      status: false,
      message: (err as Error).message
    });
  }
};

const getPhoto = async (req: Request, res: Response) => {
  try {
    const response = await photo.getPhoto(req.params.id);
    res.status(200).json({
      status: true,
      data: { ...response },
      message: 'Retrieved the photos successfully!'
    });
  } catch (err) {
    res.status(401).json({
      status: false,
      message: (err as Error).message
    });
  }
};

const updatePhoto = async (req: Request, res: Response) => {
  try {
    const response = await photo.updatePhoto(req.params.id, req.body);
    res.status(201).json({
      status: true,
      data: { ...response },
      message: 'Photo updated successfully!'
    });
  } catch (err) {
    res.status(401).json({
      status: false,
      message: (err as Error).message
    });
  }
};

const deletePhoto = async (req: Request, res: Response) => {
  try {
    await photo.deletePhoto(req.params.id);
    res.status(200).json({
      status: true,
      message: 'Photo deleted successfully!'
    });
  } catch (err) {
    res.status(401).json({
      status: false,
      message: (err as Error).message
    });
  }
};

const photos_controller_routes = (app: Application, logger: NextFunction) => {
  app.post('/user/:id/photos', logger, uploadPhoto);
  app.get('/user/:id/photos', logger, getPhoto);
  app.patch('/user/:id/photos', logger, updatePhoto);
  app.delete('/user/:id/photos', logger, deletePhoto);
};
export default photos_controller_routes;
