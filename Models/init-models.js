import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _Category from "./Category.js";
import _Food from "./Food.js";
import _Order from "./Order.js";
import _OrderFood from "./OrderFood.js";
import _Status from "./Status.js";
import _Table from "./Table.js";
import _User from "./User.js";

export default function initModels(sequelize) {
    const Category = _Category.init(sequelize, DataTypes);
    const Food = _Food.init(sequelize, DataTypes);
    const Order = _Order.init(sequelize, DataTypes);
    const OrderFood = _OrderFood.init(sequelize, DataTypes);
    const Status = _Status.init(sequelize, DataTypes);
    const Table = _Table.init(sequelize, DataTypes);
    const User = _User.init(sequelize, DataTypes);

    Food.belongsToMany(Order, { as: 'orderId_Orders', through: OrderFood, foreignKey: "foodId", otherKey: "orderId" });
    Order.belongsToMany(Food, { as: 'foodId_Foods', through: OrderFood, foreignKey: "orderId", otherKey: "foodId" });
    Food.belongsTo(Category, { as: "category", foreignKey: "categoryId" });
    Category.hasMany(Food, { as: "Foods", foreignKey: "categoryId" });
    OrderFood.belongsTo(Food, { as: "food", foreignKey: "foodId" });
    Food.hasMany(OrderFood, { as: "OrderFoods", foreignKey: "foodId" });
    OrderFood.belongsTo(Order, { as: "order", foreignKey: "orderId" });
    Order.hasMany(OrderFood, { as: "OrderFoods", foreignKey: "orderId" });
    Order.belongsTo(Status, { as: "statusCode_Status", foreignKey: "statusCode" });
    Status.hasMany(Order, { as: "Orders", foreignKey: "statusCode" });
    Order.belongsTo(Table, { as: "table", foreignKey: "tableId" });
    Table.hasMany(Order, { as: "Orders", foreignKey: "tableId" });
    Order.belongsTo(User, { as: "orderedBy_User", foreignKey: "orderedBy" });
    User.hasMany(Order, { as: "Orders", foreignKey: "orderedBy" });
    Order.belongsTo(User, { as: "updateFinishedBy_User", foreignKey: "updateFinishedBy" });
    User.hasMany(Order, { as: "updateFinishedBy_Orders", foreignKey: "updateFinishedBy" });

    return {
        Category,
        Food,
        Order,
        OrderFood,
        Status,
        Table,
        User,
    };
}
