import { Op } from 'sequelize';
import { models } from '../../Models/index.js';


export async function getFood(req, res) {
    const { categoryId, minPrice, maxPrice, minQuantity, maxQuantity, page = 1, limit = 10 } = req.query;

    try {
        const where = {};
        const offset = (page - 1) * limit;


        if (categoryId) {
            where.categoryId = categoryId;
        }

        if (minPrice || maxPrice) {
            where.price = {};
            if (minPrice) {
                where.price[Op.gte] = minPrice;
            }
            if (maxPrice) {
                where.price[Op.lte] = maxPrice;
            }
        }

        if (minQuantity || maxQuantity) {
            where.quantity = {};
            if (minQuantity) {
                where.quantity[Op.gte] = minQuantity;
            }
            if (maxQuantity) {
                where.quantity[Op.lte] = maxQuantity;
            }
        }
        const { count, rows } = await models.Food.findAndCountAll({
            where,
            offset,
            limit: parseInt(limit),
        });
        const totalPages = Math.ceil(count / limit);
        res.status(200).json({
            foods: rows,
            currentPage: parseInt(page),
            totalPages,
            totalItems: count,
        });
    } catch (error) {
        console.error(req.method, req.url, error);
        res.status(500).json({ message: `Server cannot fetch foods: ${err}` });
    }
}
