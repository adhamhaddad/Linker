import { Request, Response, Router } from 'express';
import path from "path";
import { register, login } from '../../middlewares/validate-form';

// Express Router
const router = Router();

// Requests
router.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        message: "Connecting Done!"
    })
})
router.get("/home", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../../../public/html/gpi_users/home.html"))
})
router.get("/profile", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../../../public/html/gpi_users/profile.html"))
})
router.get("/profile_user", (_req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../../../public/html/gui_users/profile-port.html"))
})
router.get("/notifications", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../../../public/html/gpi_users/home.html"))
})
router.get("/messages", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../../../public/html/gpi_users/home.html"))
})



// Register Requests
router.get("/register", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../../../public/html/gpi_users/register.html"))
})
router.post("/register", register, (req: Request, res: Response) => {
    res.redirect('/profile_user');
})

// Login Requests
router.get("/login", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../../../public/html/gpi_users/login.html"))
})
router.post("/login", login, (req: Request, res: Response) => {
    res.redirect('/profile_user');
});

export default router;