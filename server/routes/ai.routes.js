import express from 'express';
import { isAuthenticated } from '../middleware/auth.middleware.js';
import { deleteChat, generateEmail, getChatDetails, getEmailHistory } from '../controllers/ai.controller.js';
const router = express.Router();

router.post('/generate-email', isAuthenticated, generateEmail);
router.get("/email-history", isAuthenticated, getEmailHistory);
router.get("/email-history/:chatId",isAuthenticated,getChatDetails);
router.delete("/delete-chat/:chatId",isAuthenticated,deleteChat);
export default router;