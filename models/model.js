import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const postSchema = new mongoose.Schema({
  userID: {type: String, required: true},
  petID: {type: String, required: true},
  description: String,
  start_date: {type: Date, required: true},
  end_date: {type: Date, required: true}
  // img: ?
})

const userSchema = new mongoose.Schema({
  username: String,
  email: {type: String, required: true, unique: true},
  petID: [String]
  // profile picture
  // contact
})

const petSchema = new mongoose.Schema({
  name: {type: String, required: true},
  type: {type: String, required: true},
  breed: String,
  size: Number,
  gender: String,
  age: Number
  // image
})

userSchema.plugin(passportLocalMongoose, {usernameField: "email"});

export const Post = mongoose.model('Post', postSchema);
export const User = mongoose.model('User', userSchema);
export const Pet = mongoose.model('Pet', petSchema);
