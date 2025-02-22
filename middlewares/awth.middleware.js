import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const awth = async (req, res, next) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    let user = await User.findOne({ username: decode.username });

    if (!user) {
      return res.status(401).send("login again");
    }

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send("authentication required");
    console.error(error);
  }
};

export default awth;
