import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const postSchema = new mongoose.Schema({
    petName: String,
    petType: String,
    description: String,
    start_date: Date,
    end_date: Date,
    email: String // change to userID later
    // img: ?
  })

const userSchema = new mongoose.Schema({
"username": String,
"email": {type: String, required: true, unique: true},
})

userSchema.plugin(passportLocalMongoose, {usernameField: "email"});

export const Post = mongoose.model('Post', postSchema);
export const User = mongoose.model('User', userSchema);
