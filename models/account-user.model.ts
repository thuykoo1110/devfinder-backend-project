import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    fullName: String, 
    email: String, 
    password: String,
    avatar: String,
    phone: String
  },
  {
    timestamps: true
  }
)

const AccountUser = mongoose.model('AccountUser', schema, "account-user")

export default AccountUser