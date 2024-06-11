import { models } from '../../Models/index.js';
import fs from 'fs';
import { __dirname } from '../../server.js';

export async function getFoodImageById(req, res) {
    const id = req.params.id;
    try {
        const extractedFood = await models.Food.findOne({ where: { foodId: id } });
        if (extractedFood) {
            // const imagePath = path.join(__dirname, '/upload', `${id}.png`);
            res.setHeader('Content-Type', 'image/png'); 
            const imageData = fs.readFileSync(`${__dirname}/upload/${id}.png`);
            res.setHeader('Content-Type', 'image/png'); 
            res.status(200).sendFile(`${__dirname}/upload/${id}.png`);
        }
    } catch (err) {
        console.error(req.method, req.url, err);
        res.status(500).json({ 'message': 'Server cannot get food by id' });
    }
}
