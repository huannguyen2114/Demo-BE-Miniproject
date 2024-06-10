import { models } from "../../Models/index.js";
// import Category from "../../Models/Category";

export async function createCategory(req, res) {
    const {name} = req.body;
    try {
        const newCate = await models.Category.create({
            name: name,
        })
        res.status(200).json(newCate);
    } catch (err){
        console.log(err);
        res.status(500).json({ "message": "Failed server food logic" })
    }
}
