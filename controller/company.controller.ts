import { Request, Response } from "express"
import AccountCompany from "../models/account-company.model"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

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

export const loginPost = async(req: Request, res: Response) => {
  const { email, password } = req.body;

  const existAccount = await AccountCompany.findOne({
    email: email
  })

  if(!existAccount){
    res.json({
      code: "error",
      message: "Email không tồn tại trong hệ thống!"
    })
    return;
  }

  const isPasswordValid = await bcrypt.compare(password, `${existAccount.password}` )  // ép kiểu thành string

  if(!isPasswordValid){
    res.json({
      code: "error",
      message: "Mật khẩu không đúng!"
    })
    return;
  }

  const token = jwt.sign(
    {
      id: existAccount.id,
      email: existAccount.email
    },
    `${process.env.JWT_SECRET}`,
    {
      expiresIn: "1d"
    }
  );

  res.cookie("token", token, {
    maxAge: (24*60*60*1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // https để true, http để false
    sameSite: "lax"  // cho phép gửi cookie giữa các tên miền
  });

  res.json({
    code: "success",
    message: "Đăng nhập thành công!"
  })
}