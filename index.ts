import express from "express"
import cors from "cors"
import * as userController from "./controller/user.controller"
import routes from './routes/index.route'

const app = express()
const port = 4000;

// cấu hình CORS
app.use(cors({
  origin: "*" //tất cả tên miền được phép truy cập 
}))

app.use(express.json()) // cho phép gửi dữ liệu dạng json

app.use("/", routes)

app.listen(port, ()=> {
  console.log(`website is running on ${port} port`)
})