import Book from "../models/book.model.js";

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
