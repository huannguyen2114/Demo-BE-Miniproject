import { models } from "../../Models/index.js";

export default async function updateFood(req, res) {
    try {
        const body = req.body;
        const params = req.params;
        const payload = req.locals.decodes;
        const user = await models.User.findOne({ where: { userName: payload.userName } });

        if (user.isAdmin) {
            const food = await models.Food.findOne({ where: { foodId: params.id } });
            if (!food) {
                return res.status(404).json({
                    message: "Not found food"
                });
            }
            if (body.quantity) if (body.quantity < 0) return res.status(400).json({ message: "quantity can't be negative" });
            if (body.price) if (body.price < 0) return res.status(400).json({ message: "price can't be negative" });
            await models.Food.update({ body }, { where: { foodId: params.id } });
        }
        else {
            return res.status(405).json({
                message: "Access denied"
            });
        }

    } catch (error) {
        console.error(req.method, req.url, error);
        res.status(500).json(error);
    }
}