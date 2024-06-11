import { models } from "../../Models/index.js";


export async function createFood(req, res) {
    const { categoryId, name, quantity, price } = req.body;
    console.log(categoryId, name, quantity, price);
    try {
        const newFood = await models.Food.create({
            categoryId: categoryId,
            name: name,
            quantity: quantity,
            price: price
        });
        return res.status(200).json(newFood);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ "message": "Server cannot create food" });
    }
}