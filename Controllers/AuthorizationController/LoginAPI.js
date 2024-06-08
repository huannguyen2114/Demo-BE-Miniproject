import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { models } from '../../Models/index.js'
import 'dotenv/config'
import { mapUser } from '../../DTO/UserDTO.js'

const saltRounds = 10
const secret = process.env.JWT_SECRET_KEY
const jwt_algo = "HS256"

export default async function login(req, res) {
    try {
        const { userName, pwd } = req.body
        if (!userName || !pwd) {
            return res.status(400).json({ "message": "No username and/or pwd" })
        }
        const extractedUser = await models.User.findOne({ where: { userName: userName } })
        if (!extractedUser) {
            return res.status(404).json({ "message": "No user found with provided username" })
        }
        const result = await bcrypt.compare(pwd, extractedUser.pwd)
        if (!result) {
            return res.status(400).json({ "message": "Incorrect password" })
        }

        const age = 1000 * 60 * 60 * 24 * 7
        const token = jwt.sign({ username: extractedUser.userId, isAdmin: extractedUser.isAdmin }, secret, { algorithm: jwt_algo, expiresIn: age })

        return res.cookie("token", token, { httpOnly: true, maxAge: age }).status(200).json(mapUser(extractedUser))
    } catch (e) {
        console.log(e)
        res.status(500).json({ "message": "Failed server login logic" })
    }
}