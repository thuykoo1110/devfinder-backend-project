import mongoose from "mongoose";

export const connectDB = async() => {
  try{
    await mongoose.connect(`${process.env.DATABASE}`)
    console.log("Kết nối DB thành công!")
  } catch(error){
    console.log(error)
    console.log("Kết nói DB thất bại!")
  }
}