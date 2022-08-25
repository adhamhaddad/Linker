import { Request, Response, NextFunction, Application } from "express";
import Reaction from "../models/Reactions";
import token from '../middlewares/token';

const reaction = new Reaction();

const createReactions = async (req: Request, res: Response) => {
    try {
        const response = await reaction.createReactions(req.body);
        res.status(201).json({
            status: true,
            data: response,
            message: 'Reactions created successfully!'
        });
    } catch (err) {
        res.status(401).json({
            status: false,
            message: (err as Error).message
        });
    }
}

const getAllReactions = async (_req: Request, res: Response) => {
    try {
        const response = await reaction.getAllReactions();
        res.status(200).json({
            status: true,
            data: response,
            message: 'Reactions retrieved successfully!'
        });
    } catch (err) {
        res.status(401).json({
            status: false,
            message: (err as Error).message
        });
    }
}

const getReactions = async (req: Request, res: Response) => {
    try {
        const response = await reaction.getReactions(req.params.id);
        res.status(200).json({
            status: true,
            data: response,
            message: 'Reactions retrieved successfully!'
        });
    } catch (err) {
        res.status(401).json({
            status: false,
            message: (err as Error).message
        });
    }
}

const updateReactions = async (req: Request, res: Response) => {
    try {
        const response = await reaction.updateReactions(req.params.id, req.body);
        res.status(201).json({
            status: true,
            data: response,
            message: 'Reactions updated successfully!'
        });
    } catch (err) {
        res.status(401).json({
            status: false,
            message: (err as Error).message
        });
    }
}

const deleteReactions = async (req: Request, res: Response) => {
    try {
        const response = await reaction.deleteReactions(req.params.id);
        res.status(200).json({
            status: true,
            data: response,
            message: 'Reactions deleted successfully!'
        });
    } catch (err) {
        res.status(401).json({
            status: false,
            message: (err as Error).message
        });
    }
}

const reactions_handler_routes = (app: Application, logger: NextFunction) => {
    app.post('/reactions', logger, token, createReactions)
    app.get('/reactions', logger, token, getAllReactions)
    app.get('/reactions/:id', logger, token, getReactions)
    app.patch('/reactions/:id', logger, token, updateReactions)
    app.delete('/reactions/:id', logger, token, deleteReactions)
}
export default reactions_handler_routes;