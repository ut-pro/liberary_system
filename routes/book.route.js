import express from "express";
import checkRole from "../middlewares/role.middleware.js";
import awth from "../middlewares/awth.middleware.js";
import {
  createBook,
  updateBook,
  deleteBook,
} from "../controllers/book.controller.js";

const router = express.Router();

router.post("/create", awth, checkRole("LIBRARIAN"), createBook);
router.patch("/update/:id", awth, checkRole("LIBRARIAN"), updateBook);
router.delete("/delete/:id", awth, checkRole("LIBRARIAN"), deleteBook);

export default router;
