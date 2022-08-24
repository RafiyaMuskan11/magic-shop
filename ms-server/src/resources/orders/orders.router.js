// const { Router } = require("express");
import { Router } from "express";
import Order from "./orders.model.js";
import User from "../users/users.model.js";

const router = Router();

// router.post("/", (req, res) => res.json({ message: "Hello" }));
router.post("/", (req, res) => {
  const { productsids, userid } = req.body;
  console.log(productsids);

  if (!productsids || !userid) {
    return res
      .status(400)
      .json({ message: "userids and productids are required" });
  }

  User.findOne({ where: { id: userid } })
    .then((user) => {
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }
      Order.create({ productsids, userId: userid })

        .then((order) =>
          res.status(201).json({ message: "Order created successfully", order })
        )
        .catch((e) =>
          res.status(400).json({ message: "Failed to create order", error: e })
        );
    })
    .catch((e) =>
      res.status(400).json({ message: "Something went wwßwrong", error: e })
    );
});

router.get("/:userid", (req, res) => {
  const { userid } = req.params;
  console.log(userid);

  User.findOne({ where: { id: userid } })
    .then((user) => {
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }
      Order.findAll({ where: { userid } })
        .then((orders) =>
          res
            .status(201)
            .json({
              message: "Orders fetched successfully for the user",
              orders,
            })
        )
        .catch((e) =>
          res.status(400).json({ message: "Failed to fetch orders", error: e })
        );
    })
    .catch((e) =>
      res.status(400).json({ message: "Something went wrong", error: e })
    );
});

export default router;
