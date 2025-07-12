import User from "../models/user.model.js";
import { generateToken } from "../utils/generateToken.js";
import { passwordCompare, passwordEncrypt } from "../utils/passwordBcrypt.js";

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;
  if (!fullName || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    //hash password
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be atleast 6 characters" });
    }
    // check the user if its already exist
    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await passwordEncrypt(password);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();

      return res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else {
      return res.status(400).json({ message: "Invalid User Data" });
    }
  } catch (error) {
    console.log("Error signup controller: ", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    const isPasswordCorrect = await passwordCompare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    generateToken(user._id, res);
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("Login Failed :", error);
    res.status(500).json({ message: "Internal server Error" });
  }
};
export const logout = (req, res) => {
  try {
    res.clearCookie("jwt");
    res.status(200).json({ message: "Logout Successfully" });
  } catch (error) {
    console.log("error in logout: ", error);
    res.status(500).json({ message: "Internal server Error" });
  }
};

export const updateProfile = (req, res) => {
  return res.status(200).json({ message: "update profile" });
};
