//==================== import lib===========================
import express from "express"
import cors from 'cors'
import bodyParser from "body-parser"
import 'dotenv/config'

//==================== import router==========================
import authorizationRouter from './Routes/AuthorizationRouter.js'
import foodRouter from './Routes/FoodRouter.js'
import orderRouter from './Routes/OrderRouter.js'
import tableRouter from './Routes/TableRouter.js'


//===================config app===============================
const app = express()


app.use(cors());


app.use(bodyParser.json({ limit: '200mb' }));
app.use(bodyParser.urlencoded({ limit: '200mb', extended: true }));
app.use(bodyParser.text({ limit: '200mb' }));


app.use('/api/authorization', authorizationRouter)
app.use('/api/food', foodRouter)
app.use('/api/orders', orderRouter)
app.use('/api/tables', tableRouter)


app.listen(process.env.PORT, "0.0.0.0", () => {
    console.log("Running at %d", process.env.PORT)
})