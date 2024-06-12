import { models } from '../../Models/index.js';

async function updateFood(req, res) {
    try {
        const body = req.body;
        const files = req.files;
        const params = req.params;
        // const payload = res.locals.decodes;
        // const user = await models.User.findOne({ where: { userName: payload.userName } });

        if (true) {
            const food = await models.Food.findOne({ where: { foodId: params.id } });
            if (!food) {
                return res.status(404).json({
                    message: "Not found food"
                });
            }
            if (body.quantity) if (body.quantity < 0) return res.status(400).json({ message: 'quantity cannot be negative' });
            if (body.price) if (body.price < 0) return res.status(400).json({ message: 'price cannot be negative' });
            await models.Food.update(body, { where: { foodId: params.id } });
            food.imgURL = `/food/img/${food.foodId}`;
            if (files) files.image.mv(__dirname + '/upload/' + food.foodId + ".png");
        }
        else {
            return res.status(405).json({
                message: "Access denied"
            });
        }

        return res.status(200).json({ message: 'Update successfully' });

    } catch (error) {
        console.error(req.method, req.url, error);
        res.status(500).json(error);
    }
}

export {
    updateFood
};