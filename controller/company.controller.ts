import { Request, Response } from "express"
import AccountCompany from "../models/account-company.model"
import bcrypt from "bcryptjs"

export const registerPost = async(req: Request, res: Response) => {
  const existAccount = await AccountCompany.findOne({
    email: req.body.email
  })

  if(existAccount){
    res.json({
      code: "error",
      message: "Email đã tồn tại!"
    })
    return;
  }

  // Mã hóa mật khẩu
  const salt = await bcrypt.genSalt(10);
  req.body.password = await bcrypt.hash(req.body.password, salt);

  const newAccount = new AccountCompany(req.body);
  await newAccount.save();

  res.json({
    code: "success",
    message: "Đăng kí tài khoản thành công!"
  })
}