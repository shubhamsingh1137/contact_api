import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

export const isAuthenticated = async (req, res, next) => {
  // req.headre se token milega aur kisi bhi const value me rekh dejiye jaise yha pe Auth me rakh agya hai
  const token = req.header("Auth");

  // console.log("check token =", token);
  // ye kiya thaa token paane ke liye

  //  maan lo token nhi mila then

  if (!token) return res.json({ message: "Login first" });

  // //   token verify karne ke liye jwt ko import karna hoga

  const decoded = jwt.verify(token, "process.env.JWT");

  // console.log("token data =", decoded);

  // // const id bna hai ye db se userId find karega iske liye import karna hoga User ko from models from user.js se
  const id = decoded.userid;

  let user = await User.findById(id);
  // // agar user nhi mila to
  if (!user) return res.json({ message: "user not find" });

  // //  user ko apne hisab se globally save kar sakte hai , here req.user(user kijagah koi bhi name rakh sakte hai)

  req.user = user;

  next();
};
