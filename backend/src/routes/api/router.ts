import { Request, Response, Router } from 'express';
import { register, login } from '../../middlewares/validate-form';
import path from "path";

// Express Router
const router = Router();

// Requests
router.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        message: "Connecting Done!"
    })
})
router.get("/home", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../../../public/index"))
})
router.get("/profile", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../../../public/profile"))
})
router.get("/profile_user", (_req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../../../public/profile-port"))
})
router.get("/notifications", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../../../public/home"))
})
router.get("/messages", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../../../public/home"))
})


// Register Requests
router.get("/register", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../../../public/register"))
})
router.post("/register", register, (req: Request, res: Response) => {
    res.redirect('/profile_user');
})


// Login Requests
router.get("/login", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../../../public/login"))
})
router.post("/login", login, (req: Request, res: Response) => {
    res.redirect('/profile_user');
});

export default router;