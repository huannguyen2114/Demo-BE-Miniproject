import { Op, Sequelize } from "sequelize";
import { models } from "../../Models/index.js";


export async function getAllFood(req, res) {
  try {
    const foods = await models.Food.findAll();
    res.status(200).json(foods);
  } catch (err) {
    res.status(500).json({ message: `Failed to fetch foods: ${err}` });
  }
}
