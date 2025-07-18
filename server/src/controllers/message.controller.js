import cloudinary from "../lib/cloudinary.js";
import { getRecieverId, io } from "../lib/socket.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";

export const getUserForSidebar = async (req, res) => {
  try {
    const loggedInUser = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUser },
    }).select("-password");

    return res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error in getting Users for Sidebar: ", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params; // getting tha params and renaming it to userToChatID
    const myId = req.user._id;

    // this will get the messages between sender and reciever
    const messages = await Message.find({
      $or: [
        { senderId: myId, recieverId: userToChatId },
        { senderId: userToChatId, recieverId: myId },
      ],
    });
    return res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages controller: ", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: recieverId } = req.params;
    const senderId = req.user._id;

    let imageURL;
    if (image) {
      const uploadImage = await cloudinary.uploader.upload(image);
      imageURL = uploadImage.secure_url;
    }

    const newMessage = new Message({
      senderId,
      recieverId,
      text,
      image: imageURL,
    });

    await newMessage.save();

    // realtime functionality goes here => socket.io
    //"io.to" will only broadcast it to a certain reciever

    const recieverSocketId = getRecieverId(recieverId); // Look up the socket ID of the recipient using their user ID.

    // This function should return the current socket ID associated with the user if they are online.
    if (recieverSocketId) {
      // Only proceed if the recipient is connected (has a valid socket ID)
      io.to(recieverSocketId).emit("newMessage", newMessage);
      // Send the new message to the specific socket (user) using Socket.IO.
      // Only the intended recipient will receive this event in real time.
    }

    return res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage controller: ", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
