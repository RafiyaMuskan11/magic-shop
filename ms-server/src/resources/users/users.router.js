import { Router } from "express";
import User from "./users.model.js";

const router = Router();

router.post("/signup", (req, res) => {
  const { username, email, password, phone, address } = req.body;

  console.log(username, email, password, phone);

  if (!username || !email || !password || !phone || !address) {
    return res.status(400).json({ message: "Please fill all fields", success: false, });
  }

  User.create({ username, email, password, phone, address })
    .then((user) =>
      res.status(201).json({ message: "User created successfully, login with your credentials",success: true,  user })
    )
    .catch((e) =>
      res.status(400).json({ message: "Something went wrong",success: false, error: e })
    );
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Please fill all fields", success: false });
  }

  User.findOne({ where: { email } })
    .then((user) => {
      if (!user) {
        return res.status(400).json({ message: "User not found", success: false });
      }

      if (user.password !== password) {
        return res.status(400).json({ message: "Incorrect password", success: false });
      }

      res.status(200).json({ message: "User logged in successfully", user, success: true });
    })
    .catch((e) =>
      res.status(400).json({ message: "Something went wrong", error: e, success: false })
    );
});

export default router;
