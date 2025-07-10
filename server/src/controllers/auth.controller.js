import User from "../models/user.model.js";
import { passwordEncrypt } from "../utils/passwordBcrypt.js";

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    //hash password
    if (password.length < 6) {
      return res
        .status(400)
        .send({ message: "Password must be atleast 6 characters" });
    }
    // check the user if its already exist
    const user = await User.findOne({ email });
    if (user) return res.status(400).send({ message: "Email already exists" });

    const hashedPassword = await passwordEncrypt(password);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    if (newUser) {
    } else {
      res.status(400).send({ message: ":Invalid User Data" });
    }
  } catch (error) {
    console.log("Error creating new user: ", error);
  }
};
export const login = (req, res) => {
  res.send("login route");
};
export const logout = (req, res) => {
  res.send("logout route");
};
