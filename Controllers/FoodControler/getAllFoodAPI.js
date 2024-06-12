import { models } from '../../Models/index.js';


export async function getAllFood(req, res) {
    try {
        const foods = await models.Food.findAll();
        res.status(200).json(foods);
    } catch (error) {
        console.error(req.method, req.url, error);
        res.status(500).json({ message: `Server cannot fetch foods: ${error}` });
    }
}
