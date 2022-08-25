import { Request, Response, NextFunction, Application } from "express";
import Person from "../models/Person";

const user = new Person();

const createUser = async (req: Request, res: Response) => {
    try {
        await user.createUser(req.body);
        /*res.status(201).json({
            status: true,
            data: response,
            message: 'User created successfully!'
        })*/
        res.redirect('http://localhost:3000/login')
    } catch (err) {
        res.status(400).json({
            status: false,
            message: (err as Error).message
        })
    }
}

const getAllUsers = async (_req: Request, res: Response) => {
    try {
        const response = await user.getAllUsers();
        res.status(200).json({
            status: true,
            data: response,
            message: 'User retrieved successfully!'
        })
    } catch (err) {
        res.status(400).json({
            status: false,
            message: (err as Error).message
        })
    }
}


const getUser = async (req: Request, res: Response) => {
    try {
        const response = await user.deleteUser(req.params.id);
        res.status(200).json({
            status: true,
            data: response,
            message: 'User retrieved successfully!'
        })
    } catch (err) {
        res.status(400).json({
            status: false,
            message: (err as Error).message
        })
    }
}

const updateUser = async (req: Request, res: Response) => {
    try {
        const response = await user.deleteUser(req.params.id);
        res.status(201).json({
            status: true,
            data: response,
            message: 'User updated successfully!'
        })
    } catch (err) {
        res.status(400).json({
            status: false,
            message: (err as Error).message
        })
    }
}

const deleteUser = async (req: Request, res: Response) => {
    try {
        const response = await user.deleteUser(req.params.id);
        res.status(200).json({
            status: true,
            data: response,
            message: 'User deleted successfully!'
        })
    } catch (err) {
        res.status(400).json({
            status: false,
            message: (err as Error).message
        })
    }
}

const authenticate = async (req: Request, res: Response) => {
    try {
        const response = await user.authenticate(req.body.username, req.body.password);
        if (!response) {
            return res.status(401).json({
                status: false,
                message: 'Username or password incorrect'
            })
        }
        //! Here will add res.redirect('http://localhost:3000/')
        res.status(200).json({
            status: true,
            data: response,
            message: 'User authenticated successfully!'
        })
        //! ----------------------------------------------------
    } catch (err) {
        res.status(400).json({
            status: false,
            message: (err as Error).message
        })
    }
}

const user_handler_routes = (app: Application, logger: NextFunction) => {
    app.post('/user', logger, createUser)
    app.get('/user', logger, getAllUsers)
    app.get('/user/:id', logger, getUser)
    app.patch('/user/:id', logger, updateUser)
    app.delete('/user/:id', logger, deleteUser)
    app.post('/authenticate', logger, authenticate)
}
export default user_handler_routes;