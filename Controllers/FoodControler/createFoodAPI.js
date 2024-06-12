import { models } from '../../Models/index.js';


// const __dirname = ""
export async function createFood(req, res) {

    // Authorize the user (Only admin can createFood)
    let user = res.locals.decodes;
    user = await models.User.findOne({
        where: {
            userName: user.userName
        }
    });
    if (!user || !user.isAdmin) return res.status(403).json({ 'message': 'Unauthorized operation' });


    const { categoryId, name, quantity, price } = req.body;
    const { image } = req.files;

    try {
        if (!image) return res.status(400).json({ 'message': 'You need to upload image' });
        // If doesn't have image mime type prevent from uploading
        if (!/^image/.test(image.mimetype)) return res.status(400).json({ 'message': 'The file does not have image mime type' });
        // Creating a new food
        const newFood = await models.Food.create({
            categoryId: categoryId,
            name: name,
            quantity: quantity,
            price: price,
            active: true
        });

        newFood["imgURL"] = `/food/img/${newFood.foodId}`;
        await newFood.save();
        // Move the uploaded image to our upload folder
        image.mv(__dirname + '/upload/' + newFood.foodId + ".png");
        return res.status(200).json(newFood);
    } catch (error) {
        console.error(req.method, req.url, error);
        return res.status(500).json({ 'message': 'Server cannot create food' });
    }
}