import express from "express";
import protectRoute from "../middleware/protectRoute";
import { getMessage, getUsersForSidebar, sendMessage } from "../controllers/message.controller";

const router = express.Router();

router.get('/conversations', protectRoute, getUsersForSidebar)
router.post('/send/:id', protectRoute, sendMessage);
router.get('/:id', protectRoute, getMessage);

export default router;