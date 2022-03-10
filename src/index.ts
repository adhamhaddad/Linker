import express, {Request, Response, Application} from "express";
import fs from "fs";
import path from "path";
import helmet from "helmet";

const app: Application = express();
const PORT = 3000


// Middlewares
app.use(express.static("public"));
app.use(express.json());
app.use(helmet());

// Requests
app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        message: "Connecting Done!"
    })
})
app.get("/home", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "/public/html/gpi_users/home.html"))
})
app.get("/profile", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "/public/html/gpi_users/home.html"))
})
app.get("/profile_user", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "/public/html/gpi_users/home.html"))
})
app.get("/notifications", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "/public/html/gpi_users/home.html"))
})
app.get("/messages", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "/public/html/gpi_users/home.html"))
})
app.get("/register", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "/public/html/gpi_users/register.html"))
})
app.get("/login", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "/public/html/gpi_users/login.html"))
})


// Express Server
app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
})