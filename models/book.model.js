import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  genre: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  author: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["AVAILABLE", "BORROWED"],
    default: "AVAILABLE",
  },
  borrowedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Book = mongoose.model("Book", bookSchema);

export default Book;
