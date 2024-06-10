import bcrypt from "bcrypt";
import User from "../../Models/User.js";
import jwt from "jsonwebtoken";
import { mapUser } from "../../DTO/UserDTO.js";
import { models } from "../../Models/index.js";
import { DataTypes, Sequelize } from "sequelize";

export default async function addNewUser(req, res) {
    try {
        const body = req.body;
        const hashCode = await bcrypt.hash(body.pwd, 10);
        const newUser = await models.User.create({
            userName: body.userName,
            name: body.name,
            pwd: hashCode,
            isAdmin: false,
        });
        res.status(200).json(mapUser(newUser));
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
}

