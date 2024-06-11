import { models } from '../../Models/index.js';
import { checkInteger } from '../../Services/checkInteger.js';

export async function deleteFood(req, res) {
    try {
        let user = res.locals.decodes;
        user = await models.User.findOne({
            where: {
                userName: user.userName
            }
        });
        if (!user || !user.isAdmin) return res.status(403).json({ 'message': 'Unauthorized operation' });
        const { id } = req.params;
        if (!id) return res.status(400).json({ 'message': 'Missing foodId field' });
        if (!checkInteger(id)) return res.status(400).json({ 'message': 'foodId must be an integer' });

        const food = await models.Food.findOne({
            where: {
                foodId: id
            }
        });
        if (!food) return res.status(204).json({ 'message': 'Food is not in database' });

        await food.destroy();
        return res.status(200).json({
            'message': 'Food is deleted'
        });
    } catch (error) {
        console.error(req.method, req.url, e);
        res.status(500).json({ 'message': 'Server cannot delete food' });
    }
}