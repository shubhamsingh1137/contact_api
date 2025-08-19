import { User } from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  // if  all feilds are empty than
  if (name == "" || email == "" || password == "")
    return res.json({ message: "all feilds are required" });

  //   agr koi user pehle se register hai aur dobara karna chahta hai through email id ke through then

  let user = await User.findOne({ email });
  if (user) return res.json({ message: "user is already exist" });

  // password ko bcrypt karne ke liye

  const hashpassword = await bcrypt.hash(password, 10);

  //   ab User me  ayee huye data ko db me store karege
  user = await User.create({ name, email, password: hashpassword });

  //   console.log("printing the data =", req.body);
  res.json({ message: " user created succesfully ", success: true, user });
  //   res.json({ message: "getting the the data from req.body" });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  // if  all feilds are empty than
  if (email == "" || password == "")
    return res.json({ message: "all feilds are required" });

  const user = await User.findOne({ email });
  if (!user) return res.json({ message: "user not exist", success: false });

  const validPass = await bcrypt.compare(password, user.password);

  if (!validPass)
    return res.json({ message: "invalid password", success: false });

  // userid ek variable hai aur iske andar user._id token ki id hai jo ki token ko chota kar dega
  const token = jwt.sign({ userid: user._id }, process.env.JWT, {
    expiresIn: "1d",
  });

  res.json({ message: `welcome ${user.name}`, token, success: true });
};
