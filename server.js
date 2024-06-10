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
import categoryRouter from './Routes/CateogryRouter.js'

//===================config app===============================
const app = express()

app.get('/', async function (req, res) {
    res.status(200).send('Welcomme')
})

app.use(bodyParser.json({ limit: '200mb' }));
app.use(bodyParser.urlencoded({ limit: '200mb', extended: true }));
app.use(bodyParser.text({ limit: '200mb' }));


app.use('/api/authorization', authorizationRouter)
app.use('/api/food', foodRouter)
app.use('/api/orders', orderRouter)
app.use('/api/tables', tableRouter)
app.use('/api/category', categoryRouter)

app.listen(process.env.PORT, () => {
    console.log("Running at %d", process.env.PORT)
})