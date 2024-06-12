import { models, sequelize } from '../../Models/index.js';
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

        const result = await sequelize.query(`SELECT createOrder(:tableId, :orderedBy, :foodList)`, {
            replacements: {
                tableId: tableId,
                orderedBy: user.userId,
                foodList: JSON.stringify(orderList)
            },
            type: sequelize.QueryTypes.SELECT,
        });

        //result is either 0 or orderId
        if (result === 0) return res.status(400).json({ 'message': 'Cannot create order' });
        return res.status(200).json(result);

    } catch (error) {
        console.error(req.method, req.url, error);
        res.status(500).json({ 'message': 'Server cannot create order' });
    }
}
