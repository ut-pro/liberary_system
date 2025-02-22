import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const saltRounds = +process.env.SALT_ROUNDS;

export const userRegister = async (req, res) => {
  try {
    let userData = { ...req.body };

    let username = await User.findOne({ username: userData.username });

    if (username) {
      return res.send("user already exist");
    }

    let password = userData.password;

    bcrypt.hash(password, saltRounds, async (err, hash) => {
      if (err) {
        console.error(err);
      }

      userData.password = hash;
      await User.create(userData);
      res.send("user created successfully");
    });
  } catch (error) {
    res.send("user not registered try again");
    console.error(error);
  }
};

export const userLogin = async (req, res) => {
  try {
    let plainPassword = req.body.password;
    let userData = await User.findOne({ username: req.body.username });

    if (!userData) {
      return res.send("user not found");
    }

    let hash = userData.password;

    bcrypt.compare(plainPassword, hash, async (err, result) => {
      if (err) console.error(err);
      console.log(result);
      if (result) {
        let payload = {
          username: userData.username,
          email: userData.email,
        };

        let token = jwt.sign(payload, process.env.JWT_SECRET_KEY);

        userData.token = token;
        await userData.save();
        res.send("login successful");
        console.log(userData);
      } else {
        res.send("username or password is incorrect");
      }
    });
  } catch (error) {
    res.send("login unsuccessful, try again");
    console.error(error);
  }
};

export const userLogout = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user._id });
    console.log(user);
    user.token = null;
    await user.save();
    res.send("logout sucess");
  } catch (error) {
    res.send("logout unsucess");
    console.error(error);
  }
};
