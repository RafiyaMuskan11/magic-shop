import { DataTypes } from "sequelize";
import sequelize from "../../utils/db-connection.js";

const Order = sequelize.define('order', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  productsids: {
    type: DataTypes.STRING
  }
}, {
  timestamps: false
})

export default Order;