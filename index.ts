import express, { Request, Response } from "express"

const app = express()
const port = 4000;

app.get("/", (req: Request, res: Response) => {
  res.send("OK")
})

app.listen(port, ()=> {
  console.log(`website is running on ${port} port`)
})