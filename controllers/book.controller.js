import Book from "../models/book.model.js";

export const viewBook = async (req, res) => {
  try {
    const booksData = await Book.find();
    res.send(booksData);
  } catch (error) {
    res.send(error);
    console.error(error);
  }
};

export const borrowBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    let book = await Book.findById({ _id: bookId });
    if (!book || book.status !== "AVAILABLE") {
      return res.send("book is not available");
    }

    book.status = "BORROWED";
    book.borrowedBy = req.user._id;
    await book.save();
    res.send("book borrowed");
  } catch (error) {
    res.send(error);
    console.error(error);
  }
};

export const returnBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    let book = await Book.findById({ _id: bookId });
    if (!book || !book.borrowedBy.equals(req.user._id)) {
      return res.send("book can't be returned");
    }

    book.status = "AVAILABLE";
    book.borrowedBy = null;
    await book.save();
    res.send("book is returned");
  } catch (error) {
    res.send(error);
    console.error(error);
  }
};

export const createBook = async (req, res) => {
  try {
    const bookData = { ...req.body, createdBy: req.user._id };
    const book = await Book.findOne({ _id: bookData._id });

    if (book) {
      return res.send("book already exist");
    }

    await Book.create(bookData);
    res.send("book created successfully");
  } catch (error) {
    res.send("book is not created, try again");
    console.error(error);
  }
};

export const updateBook = async (req, res) => {
  try {
    let bookId = req.params.id;
    const updatedBook = await Book.findByIdAndUpdate(bookId, req.body, {
      new: true,
    });

    if (!updatedBook) {
      return res.send("book not found");
    }

    res.send("book is updated");
  } catch (error) {
    res.send("failed to update the book");
    console.error(error);
  }
};

export const deleteBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    await Book.findByIdAndDelete(bookId);
    res.send("book is deleted");
  } catch (error) {
    res.send("book is not deleted try again");
    console.error(error);
  }
};
