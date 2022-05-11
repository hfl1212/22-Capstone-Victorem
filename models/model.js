import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const postSchema = new mongoose.Schema({
  userID: {type: String, required: true},
  petID: {type: String, required: true},
  description: String,
  start_date: {type: Date, required: true},
  end_date: {type: Date, required: true} // change name to expireAt if need to automatically delete
})

const userSchema = new mongoose.Schema({
  username: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  profilePhoto: String,
  pets: [String],
  contact: Object,
  isFirstTime: Boolean
})

const petSchema = new mongoose.Schema({
  name: {type: String, required: true},
  type: {type: String, required: true},
  img: [String],
  breed: String,
  size: String,
  gender: String,
  age: String,
  bio: String
})

userSchema.plugin(passportLocalMongoose, {usernameField: "email"});

export const Post = mongoose.model('Post', postSchema);
export const User = mongoose.model('User', userSchema);
export const Pet = mongoose.model('Pet', petSchema);
