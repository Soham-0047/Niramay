import express from "express";
import { chatbotController, deleteUser, sample, updateUser } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.get('/',sample)
router.post("/update/:id",verifyToken,updateUser)
router.delete("/delete/:id",verifyToken,deleteUser)
router.post('/openai/:id',verifyToken,chatbotController)

export default router;