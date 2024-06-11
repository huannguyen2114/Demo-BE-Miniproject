import bcrypt from 'bcrypt';
import { mapUser } from '../../DTO/UserDTO.js';
import { models } from '../../Models/index.js';

export default async function addNewUser(req, res) {
    try {
        const body = req.body;
        const hashCode = await bcrypt.hash(body.pwd, 10);
        const newUser = await models.User.create({
            userName: body.userName,
            name: body.name,
            pwd: hashCode,
            isAdmin: body.isAdmin ? body.isAdmin : false
        });
        res.status(200).json(mapUser(newUser));

    } catch (error) {
        console.error(req.method, req.url, error);
        res.status(500).json(error);
    }
}