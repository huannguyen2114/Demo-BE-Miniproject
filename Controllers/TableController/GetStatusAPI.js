import { models } from "../../Models/index.js";

export default async function getStatus(req, res) {
    try {
        const params = req.params;
        const table = await models.Table.findOne({
            where: { tableId: params.id },
        });
        if (table) {
            return res.status(200).json(table);
        } else {
            return res.status(404).json({
                message: "Not found table",
            });
        }
    } catch (error) {
        res.status(500).json(error);
    }
}

