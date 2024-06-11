import { models } from '../../Models/index.js';

export async function getFoodById(req, res) {
    const id = req.params.id;
    try {
        const extractedFood = await models.Food.findOne({ where: { foodId: id } });
        res.status(200).json(extractedFood);
    } catch (error) {
        console.error(req.method, req.url, error);
        res.status(500).json({ 'message': 'Server cannot get food by id' });
    }
}
