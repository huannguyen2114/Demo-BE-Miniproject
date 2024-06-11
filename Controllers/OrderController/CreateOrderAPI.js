import { models } from '../../Models/index.js';
import { checkInteger } from '../../Services/checkInteger.js';
export default async function createOrder(req, res) {
    try {
        let user = res.locals.decodes;
        user = await models.User.findOne({
            where: {
                userName: user.userName
            }
        });
        if (!user) return res.status(403).json({ 'message': 'Unauthorized operation' });

        const { tableId, orderList } = req.body;
        if (!tableId || !orderList) return res.status(400).json({ 'message': 'Missing tableId or orderList field' });
        if (!checkInteger(tableId)) return res.status(400).json({ 'message': 'tableId must be an integer' });
        // create order;
        const order = await models.Order.create({
            tableId: tableId,
            orderedBy: user.userId,
            status: 0
        });

        //create orderfood
        for (let i = 0; i < orderList.length; i++) {
            const food = await models.Food.findOne({
                where: {
                    foodId: orderList[i].foodId
                }
            });
            await models.OrderFood.create({
                orderId: order.orderId,
                foodId: orderList[i].foodId,
                quantity: orderList[i].quantity,
                price: food.price * orderList[i].quantity
            });
        }

        return res.status(200).json({ orderId: order.orderId });
    } catch (error) {
        console.error(req.method, req.url, error);
        res.status(500).json({ 'message': 'Server cannot create order' });
    }
}
