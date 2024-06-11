import { models } from "../../Models/index.js";


export default async function updateOrder(req, res) {
    try {
        const body = req.body;
        const params = req.params;
        const payload = res.locals.decodes;
        if (payload) {
            const user = await models.User.findOne({
                where: {
                    userName: payload.userName
                }
            });
            if (user.isAdmin ^ (body.statusCode == 1)) {
                return res.status(405).json({
                    message: "Access denied"
                });
            }
            const order = models.Order.findOne({
                where: {
                    orderId: params.id
                }
            });
            if (!order) {
                res.status(404).json({
                    message: 'Invalid order id'
                });
            }
            if (body.statusCode - order.statusCode != 1) {
                res.status(400).json({
                    message: "Invalid status code"
                });
            }
            const valueUpdate = body.statusCode == 1 ?
                {
                    statusCode: body.statusCode,
                    updateFinishedBy: user.userId,
                    finishTime: Date()
                }
                :
                {
                    statusCode: body.statusCode,
                    payTime: Date()
                };

            await models.Order.update(valueUpdate, { where: { orderId: params.id } });

            res.status(201).json({
                message: "Successfull",
                tableId: order.tableId
            });

        }
        else {
            res.status(401).json({
                message: "No authorization"
            });
        }

    } catch (error) {
        res.status(500).json(error);
    }
}
