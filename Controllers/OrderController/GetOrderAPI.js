import { models, sequelize } from '../../Models/index.js';
import { checkInteger } from '../../Services/checkInteger.js';
export default async function getOrder(req, res) {
    try {
        let user = res.locals.decodes;
        user = await models.User.findOne({
            where: {
                userName: user.userName
            }
        });
        if (!user) return res.status(403).json({ 'message': 'Unauthorized operation' });

        const { tableId } = req.query;
        if (!tableId) return res.status(400).json({ 'message': 'Missing tableId' });
        if (!checkInteger(tableId)) return res.status(400).json({ 'message': 'tableId must be an integer' });

        //order_extract: one order
        //orderId
        //statusCode
        //orderTime
        const order_extract = await sequelize.query(`SELECT * FROM getOrder(:tableId)`, {
            type: sequelize.QueryTypes.SELECT,
            replacements: {
                tableId: tableId
            }
        });
        //foodList_extract: array of food
        //foodId
        //NAME
        //quantity
        //price
        const foodList_extract = await sequelize.query(`SELECT * FROM getOrderFood(:orderId)`, {
            type: sequelize.QueryTypes.SELECT,
            replacements: {
                orderId: order_extract[0].orderid
            }
        });
        res.status(200).json({
            'orderId': order_extract[0].orderid,
            'statusCode': order_extract[0].statuscode,
            'ordertime': order_extract[0].ordertime,
            'total': calculateTotal(foodList_extract),
            'orderList': foodList_extract
        });
    } catch (error) {
        console.error(req.method, req.url, error);
        res.status(500).json({ 'message': 'Server cannot get order' });
    }
}

function calculateTotal(foodList) {
    let total = 0;
    for (let i = 0; i < foodList.length; i++) {
        total += foodList[i].price * foodList[i].quantity;
    }
    return total;
}