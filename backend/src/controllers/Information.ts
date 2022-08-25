import { Request, Response, NextFunction, Application } from 'express';
import Information from '../models/Information';

const info = new Information();

const createInfo = async (req: Request, res: Response) => {
    try {
        const response = await info.createInfo(req.body);
        res.status(201).json({
            status: true,
            data: {...response},
            message: 'information created successfully!'
        })
    } catch (err) {
        res.status(401).json({
            status: false,
            message: (err as Error).message
        })
    }
}

const getInfo = async (req: Request, res: Response) => {
    try {
        const response = await info.getInfo(req.params.id);
        res.status(200).json({
            status: true,
            data: response,
            message: 'Retrieved the information successfully!'
        })
    } catch (err) {
        res.status(401).json({
            status: false,
            message: (err as Error).message
        })
    }
}

const getAllInfo = async (_req: Request, res: Response) => {
    try {
        const response = await info.getAllInfo();
        res.status(200).json({
            status: true,
            data: response,
            message: 'Retrieved all information successfully!'
        })
    } catch (err) {
        res.status(401).json({
            status: false,
            message: (err as Error).message
        })
    }
}

const updateInfo = async (req: Request, res: Response) => {
    try {
        const response = await info.updateInfo(req.params.id, req.body);
        res.status(201).json({
            status: true,
            data: response,
            message: 'Information updated successfully!'
        })
    } catch (err) {
        res.status(401).json({
            status: false,
            message: (err as Error).message
        })
    }
}

const deleteInfo = async (req: Request, res: Response) => {
    try {
        const response = await info.deleteInfo(req.params.id);
        res.status(200).json({
            status: true,
            data: response,
            message: 'Information deleted successfully!'
        })
    } catch (err) {
        res.status(401).json({
            status: false,
            message: (err as Error).message
        })
    }
}

const information_handler_routes = (app: Application, logger: NextFunction) => {
    app.post('/information', logger, createInfo)
    app.get('/information', logger, getAllInfo)
    app.get('/information/:id', logger, getInfo)
    app.patch('/information/:id', logger, updateInfo)
    app.delete('/information/:id', logger, deleteInfo)
}
export default information_handler_routes;