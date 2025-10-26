import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import * as userController from "./controller/user.controller"
import routes from './routes/index.route'
import { connectDB } from "./config/database.config"

const app = express()
const port = 4000;

// Load biến môi trường từ .env
dotenv.config()

// Connet DB
connectDB()

// cấu hình CORS
app.use(cors({
  origin: "*" //tất cả tên miền được phép truy cập 
}))

app.use(express.json()) // cho phép gửi dữ liệu dạng json

app.use("/", routes)

app.listen(port, ()=> {
  console.log(`website is running on ${port} port`)
})