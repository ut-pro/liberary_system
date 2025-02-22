import express from "express";
import {
  userRegister,
  userLogin,
  userLogout,
} from "../controllers/user.controller.js";
import awth from "../middlewares/awth.middleware.js";

const router = express.Router();

router.post("/register", userRegister);
router.post("/login", userLogin);
router.post("/logout", awth, userLogout);

export default router;
