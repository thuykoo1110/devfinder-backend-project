import Joi from "joi"
import { NextFunction, Request, Response } from "express"

export const registerPost = async( req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    fullName: Joi.string()
      .min(5)
      .max(50)
      .required()
      .messages({
        "string.empty": "Vui lòng nhập họ tên!",
        "string.min": 'Họ tên phải có ít nhất 5 kí tự!',
        "string.max": 'Họ tên không được vượt quá  50 kí tự!'
      }),
    email: Joi.string()
      .required()
      .email()
      .messages({
        "string.empty": 'Vui lòng nhập email của bạn!',
        "string.email": 'Email không đúng định dạng!'
      }),
    password: Joi.string()
      .required()
      .min(8)
      .custom((value, helper) => {
        if(!/[A-Z]/.test(value)){
          return helper.error("password-uppercase")
        }
        if(!/[a-z]/.test(value)){
          return helper.error("password-lowercase")
        }
        if(!/\d/.test(value)){
          return helper.error("password-number")
        }
        if(!/[@$!%*?&]/.test(value)){
          return helper.error("password-special")
        }
      })
      .messages({
        "string.empty": 'Vui lòng nhập mật khẩu!',
        "string.min": 'Mật khẩu phải chứa ít nhất 8 ký tự!',
        "password-uppercase": 'Mật khẩu phải chứa ít nhất một chữ cái in hoa!',
        "password-lowercase": 'Mật khẩu phải chứa ít nhất một chữ cái thường!',
        "password-number": 'Mật khẩu phải chứa ít nhất một chữ số!',
        "password-special": 'Mật khẩu phải chứa ít nhất một ký tự đặc biệt!'
      })
  });

  const { error } = schema.validate(req.body);
  if(error){
    const errorMessage = error.details[0].message;

    res.json({
      code: "error",
      message: errorMessage
    })
    return;
  }

  next();
}
