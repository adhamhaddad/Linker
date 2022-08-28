import { Request, Response, NextFunction, Application } from 'express';
import Links from '../models/Links';

const link = new Links();

const uploadLink = async (req: Request, res: Response) => {
    try {
        const response = await link.uploadLink(req.body, req.params.id);
        res.status(201).json({
            status: true,
            data: {...response},
            message: 'Links uploaded successfully!'
        })
    } catch (err) {
        res.status(401).json({
            status: false,
            message: (err as Error).message
        })
    }
}

const getLink = async (req: Request, res: Response) => {
    try {
        const response = await link.getLink(req.params.id);
        res.status(200).json({
            status: true,
            data: { ...response },
            message: 'Retrieved the links successfully!'
        })
    } catch (err) {
        res.status(401).json({
            status: false,
            message: (err as Error).message
        })
    }
}

const updateLink = async (req: Request, res: Response) => {
    try {
        const response = await link.updateLink(req.params.id, req.body);
        res.status(201).json({
            status: true,
            data: { ...response },
            message: 'Links updated successfully!'
        })
    } catch (err) {
        res.status(401).json({
            status: false,
            message: (err as Error).message
        })
    }
}

const deleteLink = async (req: Request, res: Response) => {
    try {
        await link.deleteLink(req.params.id);
        res.status(200).json({
            status: true,
            message: 'Links deleted successfully!'
        })
    } catch (err) {
        res.status(401).json({
            status: false,
            message: (err as Error).message
        })
    }
}

const links_controller_routes = (app: Application, logger: NextFunction) => {
    app.post('/user/:id/links', logger, uploadLink)
    app.get('/user/:id/links', logger, getLink)
    app.patch('/user/:id/links', logger, updateLink)
    app.delete('/user/:id/links', logger, deleteLink)
}
export default links_controller_routes;