import dotenv from "dotenv";
dotenv.config();

import express from "express";
import connectDb from "./Db/db.js";
import userRouter from "./routes/user.route.js";
import bookRouter from "./routes/book.route.js";

const app = express();

app.use(express.json());

app.use("/user", userRouter);
app.use("/books", bookRouter);

app.get("/", (req, res) => {
  res.send("welcome to your liberary");
});

const port = process.env.PORT;

connectDb().then(() => {
  app.listen(port, async (err) => {
    if (err) {
      throw new Error("Server is not started");
    }

    console.log(`Server is listing at http://localhost:${port}`);
  });
});
