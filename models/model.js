import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const postSchema = new mongoose.Schema({
  userID: {type: String, required: true},
  petID: {type: String, required: true},
  description: String,
  start_date: {type: Date, required: true},
  end_date: {type: Date, required: true},
  img: String
  // img: ?
})

const userSchema = new mongoose.Schema({
  username: String,
  email: {type: String, required: true, unique: true},
  pets: [String],
  // profile picture
  contact: Object,
  isFirstTime: Boolean
})

const petSchema = new mongoose.Schema({
  name: {type: String, required: true},
  type: {type: String, required: true},
  breed: String,
  size: String,
  gender: String,
  age: String,
  bio: String
  // image
})

userSchema.plugin(passportLocalMongoose, {usernameField: "email"});

export const Post = mongoose.model('Post', postSchema);
export const User = mongoose.model('User', userSchema);
export const Pet = mongoose.model('Pet', petSchema);
