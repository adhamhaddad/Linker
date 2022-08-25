import { Router } from 'express';
import * as server from '../../controllers/Server';
import { register, login } from '../../middlewares/validate-form';

// Express Router
const router = Router();

// Main Requests
router.get("/", server.base);
router.get("/home", server.home);
router.get("/profile", server.profile);
router.get("/profile_user", server.profile_user);
router.get("/notifications", server.notifications);
router.get("/messages", server.messages);

// Register Requests
router.get("/register", server.register);
// router.post("/register", register, server.redirectRegister);

// Login Requests
router.get("/login", server.login);
// router.post("/login", login, server.redirectLogin);

export default router;