import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 5,
    },
    profilePic: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true, // this will add createdAt and updatedAt dates into the database
  }
);

const User = mongoose.model("User", userSchema);

// mongoose.model(...)	Registers a model (like a table) with Mongoose
// "User"	The name of the collection (Mongoose will make it lowercase plural → users)
// userSchema	The structure (fields + types + rules) for the documents
// const User = ...	Stores the model so you can use it to create, read, update, delete users

export default User;
