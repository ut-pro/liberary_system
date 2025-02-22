import express from "express";
import checkRole from "../middlewares/role.middleware.js";
import awth from "../middlewares/awth.middleware.js";
import {
  createBook,
  updateBook,
  deleteBook,
  viewBook,
  borrowBook,
  returnBook,
} from "../controllers/book.controller.js";

const router = express.Router();

router.get("/view", awth, viewBook);
router.patch("/borrow/:id", awth, checkRole("MEMBER"), borrowBook);
router.patch("/return/:id", awth, checkRole("MEMBER"), returnBook);

router.post("/create", awth, checkRole("LIBRARIAN"), createBook);
router.patch("/update/:id", awth, checkRole("LIBRARIAN"), updateBook);
router.delete("/delete/:id", awth, checkRole("LIBRARIAN"), deleteBook);

export default router;
