import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import sequelize from "./utils/db-connection.js";

import ordersRouter from "./resources/orders/orders.router.js";
import usersRouter from "./resources/users/users.router.js";


// seed file
import Order from "./resources/orders/orders.model.js";
import User from "./resources/users/users.model.js";

// Associations related to order table
User.hasMany(Order);
Order.belongsTo(User); 


const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api/users", usersRouter);
app.use("/api/orders", ordersRouter);


app.get("/", (req, res) => res.json({ message: "Hello World" }));

const startServer = () => {
  sequelize.sync({ });
  sequelize
    .authenticate()
    .then(() => {
      console.log("Database connected!");
      app.listen(4000, () => console.log("Port 4000 is listening"));
    })
    .catch((e) => console.log(e));
};

startServer();

