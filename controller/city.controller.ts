import { Request, Response } from "express"
import City from '../models/cities.model'

export const list = async(req: Request, res: Response) => {
  const cityList = await City.find({});

  res.json({
    code: "success",
    message: "Thành công",
    cityList: cityList
  })
}